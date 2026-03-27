import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PhoneInput } from '@/components/calls/phone-input';
import { DialPad } from '@/components/calls/dial-pad';
import { CallControls } from '@/components/calls/call-controls';
import { CallTimer } from '@/components/calls/call-timer';
import { CallStatus } from '@/components/calls/call-status';
import { NumberSwitcher } from '@/components/NumberSwitcher';
import { useSoftphone } from '@/contexts/SoftphoneContext';
import { useState, useEffect } from 'react';
import { Phone, AlertCircle, PhoneIncoming, PhoneOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Softphone',
    href: '/softphone',
  },
];

interface ManualCallPageProps {
  isConfigured: boolean;
  hasAssignedNumbers: boolean;
}

function ManualCallPage({ isConfigured, hasAssignedNumbers }: ManualCallPageProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // Use SoftphoneContext - synced with global widget
  const {
    phoneNumber,
    setPhoneNumber,
    enableRecording,
    setEnableRecording,
    callState,
    callMetadata,
    formattedDuration,
    deviceState,
    deviceError,
    callError,
    setCallError,
    incomingCall,
    selectedNumber,
    handleCall,
    handleEndCall,
    handleAcceptCall: contextAcceptCall,
    handleRejectCall: contextRejectCall,
    handleDigitClick,
    toggleMute,
    toggleHold,
  } = useSoftphone();

  // Wrap context handlers with local loading states
  const handleAcceptCallWrapper = async () => {
    setIsAccepting(true);
    try {
      await contextAcceptCall();
    } finally {
      setTimeout(() => setIsAccepting(false), 500);
    }
  };

  const handleRejectCallWrapper = async () => {
    setIsRejecting(true);
    try {
      await contextRejectCall();
    } finally {
      setTimeout(() => setIsRejecting(false), 500);
    }
  };

  const isCallActive = ['dialing', 'ringing', 'connected'].includes(callState);
  
  // Dialer is enabled only when configured AND has assigned numbers AND device is ready
  const isDialerEnabled = isConfigured && hasAssignedNumbers && deviceState === 'registered';
  const canMakeCall = isDialerEnabled && callState === 'idle' && phoneNumber && phoneNumber.toString().replace(/\D/g, '').length >= 10;

  // Determine what message to show
  let disabledMessage = '';
  if (!isConfigured) {
    disabledMessage = 'Voice calling service is not configured. Please contact support.';
  } else if (!hasAssignedNumbers) {
    disabledMessage = 'No phone numbers assigned to your account. Please request a phone number first.';
  }

  return (
    <>
      <Head title="Softphone" />
      <div className="mx-auto max-w-4xl">
        <Heading title="Softphone" description="Make real-time voice calls from your browser" />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Dialer Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Dialer</CardTitle>
                  <CardDescription>Enter a phone number and click call</CardDescription>
                </div>
              </div>
              {/* Number Switcher */}
              <div className="mt-3 pt-3 border-t">
                <Label className="text-sm text-muted-foreground mb-2 block">Calling From</Label>
                <NumberSwitcher />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Configuration/Assignment Required Alert */}
              {!isDialerEnabled && disabledMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{disabledMessage}</AlertDescription>
                </Alert>
              )}

              {/* Incoming Call Alert */}
              {incomingCall && !isAccepting && !isRejecting && callState === 'idle' && (
                <div className="relative animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  <Alert className="border-2 border-primary bg-primary/5 dark:bg-primary/10 shadow-lg transition-all">
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full"></div>
                    <PhoneIncoming className="h-5 w-5 text-primary animate-bounce" />
                    <AlertDescription>
                      <div className="space-y-4">
                        <div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            Incoming Call
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Caller: <span className="font-semibold text-foreground">{incomingCall.parameters.From || 'Unknown Number'}</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            onClick={handleAcceptCallWrapper}
                            disabled={isAccepting}
                            className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            size="lg"
                          >
                            <Phone className="mr-2 h-5 w-5" />
                            Accept
                          </Button>
                          <Button
                            onClick={handleRejectCallWrapper}
                            disabled={isRejecting}
                            variant="destructive"
                            className="flex-1 shadow-md hover:shadow-lg transition-all duration-200"
                            size="lg"
                          >
                            <PhoneOff className="mr-2 h-5 w-5" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Call Accepting State */}
              {isAccepting && (
                <Alert className="border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950/30">
                  <Phone className="h-4 w-4 text-green-600 dark:text-green-500 animate-pulse" />
                  <AlertDescription>
                    <div className="text-green-900 dark:text-green-100 font-semibold">
                      Connecting call...
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Call Rejected State */}
              {isRejecting && (
                <Alert className="border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/30">
                  <PhoneOff className="h-4 w-4 text-red-600 dark:text-red-500" />
                  <AlertDescription>
                    <div className="text-red-900 dark:text-red-100 font-semibold">
                      Call rejected
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Device Status - Only show if configured and has numbers */}
              {isConfigured && hasAssignedNumbers && deviceState !== 'registered' && (
                <Alert>
                  <AlertDescription className="flex items-center">
                    <div className="flex-1">
                      {deviceState === 'registering' && 'Connecting to phone service...'}
                      {deviceState === 'offline' && 'Device offline. Refresh page to reconnect.'}
                      {deviceState === 'error' && `Device error: ${deviceError}`}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Success Status - Only show if everything is ready */}
              {isDialerEnabled && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="flex items-center gap-2 text-green-800">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Dialer connected and ready</span>
                  </AlertDescription>
                </Alert>
              )}

              {/* Call Error Display */}
              {callError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>{callError}</span>
                      <Button
                        onClick={() => setCallError(null)}
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Call Status */}
              <CallStatus
                state={callState}
                phoneNumber={callMetadata.toNumber || undefined}
              />

              {/* Call Timer (only when connected) */}
              {callState === 'connected' && (
                <CallTimer duration={formattedDuration} />
              )}

              {/* Phone Input */}
              <PhoneInput
                value={phoneNumber || ''}
                onChange={(value) => setPhoneNumber(value || '')}
                disabled={isCallActive || !isDialerEnabled}
                label="Phone Number"
              />

              {/* Dial Pad */}
              <DialPad
                onDigitClick={handleDigitClick}
                disabled={!isDialerEnabled}
              />

              {/* Recording Toggle */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recording"
                  checked={enableRecording}
                  onCheckedChange={(checked) => setEnableRecording(checked as boolean)}
                  disabled={isCallActive || !isDialerEnabled}
                />
                <Label htmlFor="recording" className="text-sm font-medium cursor-pointer">
                  Enable Recording
                </Label>
              </div>

              {/* Call/End Button */}
              {!isCallActive ? (
                <Button
                  onClick={handleCall}
                  disabled={!canMakeCall}
                  className="w-full"
                  size="default"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              ) : (
                <CallControls
                  isMuted={callMetadata.isMuted}
                  isOnHold={callMetadata.isOnHold}
                  onMuteToggle={toggleMute}
                  onHoldToggle={toggleHold}
                  onEndCall={handleEndCall}
                  disabled={!['ringing', 'connected'].includes(callState)}
                />
              )}
            </CardContent>
          </Card>

          {/* Call Information Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Call Information</CardTitle>
              <CardDescription>Current call details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">{/* Status */}
                <div>
                  <div className="font-medium text-slate-500 text-xs">Status</div>
                  <div className="mt-0.5 capitalize">{callState}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">Duration</div>
                  <div className="mt-0.5">{formattedDuration}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">From</div>
                  <div className="mt-0.5">
                    {callMetadata.fromNumber || selectedNumber?.formatted_number || '-'}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">To</div>
                  <div className="mt-0.5">{callMetadata.toNumber || '-'}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">Muted</div>
                  <div className="mt-0.5">{callMetadata.isMuted ? 'Yes' : 'No'}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">On Hold</div>
                  <div className="mt-0.5">{callMetadata.isOnHold ? 'Yes' : 'No'}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">Recording</div>
                  <div className="mt-0.5">
                    {enableRecording && callState === 'connected' ? (
                      <span className="flex items-center gap-1.5 text-red-600">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                        Recording
                      </span>
                    ) : enableRecording ? (
                      <span className="text-green-600">Enabled</span>
                    ) : (
                      <span>Disabled</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-slate-500 text-xs">Device</div>
                  <div className="mt-0.5 capitalize">{deviceState}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// Set persistent layout to ensure SoftphoneProvider is available before component renders
ManualCallPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default ManualCallPage;
