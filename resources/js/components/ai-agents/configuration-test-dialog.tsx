import { useState } from 'react';
import { Settings, CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';
import type { AiAgent } from '@/types/ai-agent';

interface ConfigurationTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: AiAgent;
}

export function ConfigurationTestDialog({
  open,
  onOpenChange,
  agent,
}: ConfigurationTestDialogProps) {
  const [testing, setTesting] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTest = async () => {
    setTesting(true);
    setResults(null);

    try {
      const response = await axios.get(`/api/v1/ai-agents/${agent.id}/test-configuration`);
      setResults(response.data);
    } catch (error: any) {
      toast.error('Failed to run configuration test');
      console.error(error);
    } finally {
      setTesting(false);
    }
  };

  const configureWebhooks = async () => {
    setConfiguring(true);

    try {
      const response = await axios.post(`/api/v1/ai-agents/${agent.id}/configure-webhooks`);
      toast.success('Webhooks configured successfully!');
      
      // Re-run test to show updated status
      setTimeout(() => runTest(), 500);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to configure webhooks';
      toast.error(message);
    } finally {
      setConfiguring(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      success: { variant: 'default', label: 'Configured' },
      warning: { variant: 'secondary', label: 'Needs Attention' },
      error: { variant: 'destructive', label: 'Error' },
    };

    const config = variants[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configuration Test</DialogTitle>
          <DialogDescription>
            Test the AI Agent configuration to ensure everything is set up correctly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button onClick={runTest} disabled={testing} variant="outline" size="sm">
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Test
                </>
              )}
            </Button>

            {results && !results.checks?.twilio?.webhook_configured && agent.phone_number && (
              <Button onClick={configureWebhooks} disabled={configuring} size="sm">
                {configuring ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Configuring...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Webhooks
                  </>
                )}
              </Button>
            )}
          </div>

          {results && (
            <div className="space-y-3">
              {/* Overall Status */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.status)}
                      <span className="font-medium">Overall Status</span>
                    </div>
                    {getStatusBadge(results.status)}
                  </div>
                </CardContent>
              </Card>

              {/* OpenAI Check */}
              {results.checks?.openai && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(results.checks.openai.status)}
                          <span className="font-medium">OpenAI API</span>
                        </div>
                        {getStatusBadge(results.checks.openai.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {results.checks.openai.message}
                      </p>
                      {results.checks.openai.key && (
                        <p className="text-xs text-muted-foreground font-mono">
                          {results.checks.openai.key}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Twilio Check */}
              {results.checks?.twilio && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(results.checks.twilio.status)}
                          <span className="font-medium">Twilio Integration</span>
                        </div>
                        {getStatusBadge(results.checks.twilio.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {results.checks.twilio.message}
                      </p>
                      {results.checks.twilio.account_name && (
                        <p className="text-xs text-muted-foreground">
                          Account: {results.checks.twilio.account_name}
                        </p>
                      )}
                      {results.checks.twilio.phone_configured !== undefined && (
                        <div className="flex gap-4 text-xs">
                          <div>
                            Phone: {results.checks.twilio.phone_configured ? '✓' : '✗'}
                          </div>
                          <div>
                            Webhook: {results.checks.twilio.webhook_configured ? '✓' : '✗'}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Webhook Check */}
              {results.checks?.webhook && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(results.checks.webhook.status)}
                          <span className="font-medium">Webhook URL</span>
                        </div>
                        {getStatusBadge(results.checks.webhook.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {results.checks.webhook.message}
                      </p>
                      {results.checks.webhook.url && (
                        <p className="text-xs text-muted-foreground font-mono break-all">
                          {results.checks.webhook.url}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {!results && !testing && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Click "Run Test" to check the configuration
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
