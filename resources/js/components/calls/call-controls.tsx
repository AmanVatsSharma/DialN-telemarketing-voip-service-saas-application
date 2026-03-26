import { Button } from '@/components/ui/button';
import { Mic, MicOff, Pause, Play, PhoneOff } from 'lucide-react';

export interface CallControlsProps {
  isMuted: boolean;
  isOnHold: boolean;
  onMuteToggle: () => void;
  onHoldToggle: () => void;
  onEndCall: () => void;
  disabled?: boolean;
}

export function CallControls({
  isMuted,
  isOnHold,
  onMuteToggle,
  onHoldToggle,
  onEndCall,
  disabled = false,
}: CallControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Mute/Unmute */}
      <Button
        type="button"
        variant={isMuted ? 'default' : 'outline'}
        size="lg"
        disabled={disabled}
        onClick={onMuteToggle}
        className="h-14 w-14 rounded-full"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>

      {/* Hold/Resume */}
      <Button
        type="button"
        variant={isOnHold ? 'default' : 'outline'}
        size="lg"
        disabled={disabled}
        onClick={onHoldToggle}
        className="h-14 w-14 rounded-full"
        title={isOnHold ? 'Resume' : 'Hold'}
      >
        {isOnHold ? (
          <Play className="h-5 w-5" />
        ) : (
          <Pause className="h-5 w-5" />
        )}
      </Button>

      {/* End Call */}
      <Button
        type="button"
        variant="destructive"
        size="lg"
        disabled={disabled}
        onClick={onEndCall}
        className="h-14 w-14 rounded-full"
        title="End Call"
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
    </div>
  );
}
