import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTwilioDevice } from '@/hooks/useTwilioDevice';
import { useCallState } from '@/hooks/useCallState';
import { useUserNumbers } from '@/hooks/useUserNumbers';
import { router } from '@inertiajs/react';

interface SoftphoneContextType {
  // Device state
  deviceState: 'offline' | 'registering' | 'registered' | 'error';
  deviceError: string | null;
  
  // Call state
  callState: 'idle' | 'dialing' | 'ringing' | 'connected' | 'ended' | 'error';
  callMetadata: any;
  activeCall: any;
  duration: number;
  formattedDuration: string;
  
  // Phone number
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  
  // Recording
  enableRecording: boolean;
  setEnableRecording: (enabled: boolean) => void;
  
  // Incoming call
  incomingCall: any;
  
  // User numbers
  selectedNumber: any;
  userNumbers: any[];
  
  // Actions
  handleCall: () => Promise<void>;
  handleEndCall: () => void;
  handleAcceptCall: () => void;
  handleRejectCall: () => void;
  handleDigitClick: (digit: string) => void;
  toggleMute: () => void;
  toggleHold: () => void;
  
  // Widget UI state
  isWidgetExpanded: boolean;
  setIsWidgetExpanded: (expanded: boolean) => void;
  isWidgetVisible: boolean;
  setIsWidgetVisible: (visible: boolean) => void;
  
  // Error state
  callError: string | null;
  setCallError: (error: string | null) => void;
  
  // Configuration
  isConfigured: boolean;
  hasAssignedNumbers: boolean;
}

const SoftphoneContext = createContext<SoftphoneContextType | undefined>(undefined);

export function SoftphoneProvider({ children }: { children: ReactNode }) {
  // Initialize Twilio device and call state
  const {
    deviceState,
    error: deviceError,
    makeCall,
    incomingCall,
    acceptIncomingCall,
    rejectIncomingCall,
  } = useTwilioDevice();

  const {
    callState,
    callMetadata,
    activeCall,
    duration,
    formattedDuration,
    initiateCall,
    endCall,
    toggleMute,
    toggleHold,
    sendDTMF,
  } = useCallState();

  const { selectedNumber, userNumbers } = useUserNumbers();

  // Local state
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [enableRecording, setEnableRecording] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);

  // Configuration from page props (we'll get this from Inertia)
  const [isConfigured, setIsConfigured] = useState(true);
  const [hasAssignedNumbers, setHasAssignedNumbers] = useState(true);

  // Get configuration from Inertia page props
  useEffect(() => {
    const pageProps = (router.page?.props || {}) as any;
    if (pageProps.softphone) {
      setIsConfigured(pageProps.softphone.isConfigured !== false);
      setHasAssignedNumbers(pageProps.softphone.hasAssignedNumbers !== false);
    }
  }, []);

  // Auto-expand widget on incoming call or when call becomes active
  useEffect(() => {
    if (incomingCall || ['dialing', 'ringing', 'connected'].includes(callState)) {
      setIsWidgetExpanded(true);
    }
  }, [incomingCall, callState]);

  // Handle outbound call
  const handleCall = async () => {
    // Prevent duplicate calls
    if (callState !== 'idle') {
      console.warn('Cannot make call: already in call state:', callState);
      return;
    }

    if (!phoneNumber || phoneNumber.toString().replace(/\D/g, '').length < 10) {
      setCallError('Please enter a valid phone number (at least 10 digits)');
      return;
    }

    try {
      // Reset any previous errors
      setCallError(null);

      // Use selected number or fallback to default
      const fromNumber = selectedNumber?.number || '+19705468331';

      console.log('Initiating call...', { phoneNumber, fromNumber, enableRecording });

      // First create the call record in the database
      const response = await window.axios.post('/calls/initiate', {
        to_number: phoneNumber,
        from_number: fromNumber,
        enable_recording: enableRecording,
      });

      console.log('Call initiate response:', response.data);

      const callData = response.data.call;

      if (!callData || !callData.id) {
        throw new Error('Failed to create call record');
      }

      console.log('Making Twilio call with call_id:', callData.id);

      // Now make the Twilio call with the call_id
      const twilioCall = await makeCall(phoneNumber, {
        call_id: callData.id.toString(),
        enableRecording: enableRecording.toString(),
      });

      if (twilioCall) {
        console.log('Twilio call successful, initiating state...');
        initiateCall(twilioCall, phoneNumber, callData.from_number, callData.id);
      } else {
        throw new Error('Failed to establish Twilio connection');
      }
    } catch (error: any) {
      console.error('Failed to initiate call:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to initiate call';
      setCallError(errorMessage);

      // Reset call state on error to allow retry
      setTimeout(() => setCallError(null), 5000);
    }
  };

  // Handle end call
  const handleEndCall = () => {
    console.log('Ending call...');
    endCall();
    setCallError(null);
    // Clear phone number immediately to prepare for next call
    setPhoneNumber('');
  };

  // Handle incoming call acceptance
  const handleAcceptCall = async () => {
    if (!incomingCall) return;

    try {
      setCallError(null);

      console.log('Accepting incoming call', incomingCall.parameters);

      // Get callId from incoming call parameters if available
      const incomingCallId = incomingCall.parameters.call_id || incomingCall.parameters.CallSid;

      // Set up the call state FIRST for the incoming call
      initiateCall(
        incomingCall,
        incomingCall.parameters.From || 'Unknown',
        incomingCall.parameters.To || selectedNumber?.number || '',
        incomingCallId
      );

      // Then accept the incoming call
      acceptIncomingCall();
    } catch (error) {
      console.error('Failed to accept incoming call:', error);
      setCallError('Failed to accept call');
    }
  };

  // Handle incoming call rejection
  const handleRejectCall = () => {
    if (!incomingCall) return;

    try {
      rejectIncomingCall();
    } catch (error) {
      console.error('Failed to reject incoming call:', error);
    }
  };

  // Handle digit click (DTMF or dialing)
  const handleDigitClick = (digit: string) => {
    if (callState === 'connected') {
      // Send DTMF if in call
      sendDTMF(digit);
    } else {
      // Add to phone number if not in call
      setPhoneNumber((prev) => (prev || '') + digit);
    }
  };

  const value: SoftphoneContextType = {
    // Device state
    deviceState,
    deviceError,

    // Call state
    callState,
    callMetadata,
    activeCall,
    duration,
    formattedDuration,

    // Phone number
    phoneNumber,
    setPhoneNumber,

    // Recording
    enableRecording,
    setEnableRecording,

    // Incoming call
    incomingCall,

    // User numbers
    selectedNumber,
    userNumbers,

    // Actions
    handleCall,
    handleEndCall,
    handleAcceptCall,
    handleRejectCall,
    handleDigitClick,
    toggleMute,
    toggleHold,

    // Widget UI state
    isWidgetExpanded,
    setIsWidgetExpanded,
    isWidgetVisible,
    setIsWidgetVisible,

    // Error state
    callError,
    setCallError,

    // Configuration
    isConfigured,
    hasAssignedNumbers,
  };

  return (
    <SoftphoneContext.Provider value={value}>
      {children}
    </SoftphoneContext.Provider>
  );
}

export function useSoftphone() {
  const context = useContext(SoftphoneContext);
  if (context === undefined) {
    throw new Error('useSoftphone must be used within a SoftphoneProvider');
  }
  return context;
}
