import { useState, useEffect, useCallback, useRef } from 'react';
import { Call as TwilioCall } from '@twilio/voice-sdk';

export type CallState = 'idle' | 'dialing' | 'ringing' | 'connected' | 'ended' | 'error';

export interface CallMetadata {
  callId: string | null;
  fromNumber: string | null;
  toNumber: string | null;
  startTime: Date | null;
  endTime: Date | null;
  duration: number; // in seconds
  isMuted: boolean;
  isOnHold: boolean;
}

export interface UseCallStateReturn {
  callState: CallState;
  callMetadata: CallMetadata;
  activeCall: TwilioCall | null;
  duration: number;
  formattedDuration: string;
  initiateCall: (call: TwilioCall, toNumber: string, fromNumber: string) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleHold: () => void;
  sendDTMF: (digits: string) => void;
  resetCall: () => void;
}

// Global call instance to persist across component remounts
let globalActiveCall: TwilioCall | null = null;
let globalCallState: CallState = 'idle';
let globalDuration: number = 0;

export function useCallState(): UseCallStateReturn {
  const [callState, setCallState] = useState<CallState>(globalCallState);
  const [activeCall, setActiveCall] = useState<TwilioCall | null>(globalActiveCall);
  const [duration, setDuration] = useState(globalDuration);
  const [callMetadata, setCallMetadata] = useState<CallMetadata>({
    callId: null,
    fromNumber: null,
    toNumber: null,
    startTime: null,
    endTime: null,
    duration: 0,
    isMuted: false,
    isOnHold: false,
  });

  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const callIdRef = useRef<string | null>(null);

  // Sync local state with global state
  useEffect(() => {
    globalCallState = callState;
    globalActiveCall = activeCall;
    globalDuration = duration;
  }, [callState, activeCall, duration]);

  // Format duration as MM:SS
  const formattedDuration = useCallback(() => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [duration]);

  // Start duration timer
  const startDurationTimer = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    durationIntervalRef.current = setInterval(() => {
      setDuration((prev) => {
        const newDuration = prev + 1;
        globalDuration = newDuration;
        return newDuration;
      });
    }, 1000);
  }, []);

  // Stop duration timer
  const stopDurationTimer = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
  }, []);

  // Initiate call
  const initiateCall = useCallback(
    async (call: TwilioCall, toNumber: string, fromNumber: string, callId?: string | number) => {
      try {
        setCallState('dialing');
        globalCallState = 'dialing';
        setActiveCall(call);
        globalActiveCall = call;
        
        // Reset duration at call start
        setDuration(0);
        globalDuration = 0;

        // If callId is provided, use it (call record already created)
        // Otherwise, this is for backwards compatibility
        callIdRef.current = callId ? String(callId) : null;

        setCallMetadata({
          callId: callId ? String(callId) : null,
          fromNumber,
          toNumber,
          startTime: new Date(),
          endTime: null,
          duration: 0,
          isMuted: false,
          isOnHold: false,
        });

        // Set up call event listeners
        call.on('ringing', () => {
          console.log('Call ringing');
          setCallState('ringing');
          globalCallState = 'ringing';
        });

        call.on('accept', () => {
          console.log('Call accepted');
          setCallState('connected');
          globalCallState = 'connected';
          startDurationTimer();
        });

        call.on('disconnect', () => {
          console.log('Call disconnected event received');
          stopDurationTimer();
          setCallMetadata((prev) => ({
            ...prev,
            endTime: new Date(),
            duration,
          }));
          setCallState('ended');
          globalCallState = 'ended';
          
          // Reset state after a brief delay to show "Call Ended" status
          setTimeout(() => {
            console.log('Resetting call state to idle');
            setCallState('idle');
            globalCallState = 'idle';
            setActiveCall(null);
            globalActiveCall = null;
            callIdRef.current = null;
            setCallMetadata({
              callId: null,
              fromNumber: null,
              toNumber: null,
              startTime: null,
              endTime: null,
              duration: 0,
              isMuted: false,
              isOnHold: false,
            });
          }, 1000);
        });

        call.on('cancel', () => {
          console.log('Call cancelled by remote party');
          stopDurationTimer();
          setCallState('ended');
          globalCallState = 'ended';
          setTimeout(() => {
            setCallState('idle');
            globalCallState = 'idle';
            setActiveCall(null);
            globalActiveCall = null;
            callIdRef.current = null;
          }, 1500);
        });

        call.on('reject', () => {
          console.log('Call rejected');
          stopDurationTimer();
          setCallState('ended');
          globalCallState = 'ended';
          setTimeout(() => {
            setCallState('idle');
            globalCallState = 'idle';
            setActiveCall(null);
            globalActiveCall = null;
            callIdRef.current = null;
          }, 1500);
        });

        call.on('error', (error: Error) => {
          console.error('Call error:', error);
          setCallState('error');
          globalCallState = 'error';
          stopDurationTimer();
          
          // Reset to idle after showing error
          setTimeout(() => {
            console.log('Resetting after error');
            setCallState('idle');
            globalCallState = 'idle';
            setActiveCall(null);
            globalActiveCall = null;
            callIdRef.current = null;
          }, 2000);
        });
      } catch (error) {
        console.error('Failed to initiate call:', error);
        setCallState('error');
        globalCallState = 'error';
      }
    },
    [duration, startDurationTimer, stopDurationTimer]
  );

  // End call
  const endCall = useCallback(async () => {
    if (activeCall) {
      console.log('Disconnecting call...');
      
      // Update call status in database first
      if (callIdRef.current) {
        try {
          await window.axios.post(`/calls/${callIdRef.current}/end`);
          console.log('Call status updated in database');
        } catch (error) {
          console.error('Failed to update call status:', error);
        }
      }
      
      // Then disconnect the call
      try {
        activeCall.disconnect();
        console.log('Call disconnected successfully');
      } catch (error) {
        console.error('Error disconnecting call:', error);
      }
      
      // Stop timer immediately
      stopDurationTimer();
    }
  }, [activeCall, stopDurationTimer]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (activeCall && callState === 'connected') {
      const isMuted = activeCall.isMuted();
      activeCall.mute(!isMuted);
      setCallMetadata((prev) => ({
        ...prev,
        isMuted: !isMuted,
      }));
    }
  }, [activeCall, callState]);

  // Toggle hold (not directly supported by Twilio Voice SDK, simulate with mute)
  const toggleHold = useCallback(() => {
    if (activeCall && callState === 'connected') {
      const isOnHold = callMetadata.isOnHold;
      activeCall.mute(!isOnHold);
      setCallMetadata((prev) => ({
        ...prev,
        isOnHold: !isOnHold,
      }));
    }
  }, [activeCall, callState, callMetadata.isOnHold]);

  // Send DTMF digits
  const sendDTMF = useCallback(
    (digits: string) => {
      if (activeCall && callState === 'connected') {
        activeCall.sendDigits(digits);
        console.log('Sent DTMF:', digits);
      }
    },
    [activeCall, callState]
  );

  // Reset call state
  const resetCall = useCallback(() => {
    setCallState('idle');
    globalCallState = 'idle';
    setActiveCall(null);
    globalActiveCall = null;
    setDuration(0);
    globalDuration = 0;
    callIdRef.current = null;
    setCallMetadata({
      callId: null,
      fromNumber: null,
      toNumber: null,
      startTime: null,
      endTime: null,
      duration: 0,
      isMuted: false,
      isOnHold: false,
    });
    stopDurationTimer();
  }, [stopDurationTimer]);

  // Restore duration timer if call is already active on mount
  useEffect(() => {
    if (globalCallState === 'connected' && !durationIntervalRef.current) {
      console.log('Restoring duration timer for active call');
      durationIntervalRef.current = setInterval(() => {
        setDuration((prev) => {
          const newDuration = prev + 1;
          globalDuration = newDuration;
          return newDuration;
        });
      }, 1000);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't stop timer on unmount - keep it running during navigation
      // Only stop if call is actually ended
    };
  }, []);

  return {
    callState,
    callMetadata,
    activeCall,
    duration,
    formattedDuration: formattedDuration(),
    initiateCall,
    endCall,
    toggleMute,
    toggleHold,
    sendDTMF,
    resetCall,
  };
}
