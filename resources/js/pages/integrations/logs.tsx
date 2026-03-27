import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { CrmWebhookLog } from '@/types/crm';
import { format } from 'date-fns';
import Heading from '@/components/heading';
import { type BreadcrumbItem } from '@/types';
import { PageHelp } from '@/components/page-help';
import { dashboard } from '@/routes';

interface Props {
  logs: {
    data: CrmWebhookLog[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  integration?: {
    id: number;
    name: string;
  };
}

export default function Logs({ logs, integration }: Props) {
  const handleRetry = async (logId: number) => {
    if (!confirm('Retry this webhook?')) return;

    try {
      const response = await fetch(`/api/v1/crm-integrations/logs/${logId}/retry`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      const result = await response.json();
      alert(result.success ? '✅ Webhook retried successfully' : '❌ ' + result.message);
      window.location.reload();
    } catch (error) {
      alert('Failed to retry webhook');
    }
  };

  const isSuccess = (log: CrmWebhookLog) => {
    return log.response_status && log.response_status >= 200 && log.response_status < 300;
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'CRM Integrations', href: '/integrations' },
    { title: integration ? `${integration.name} Logs` : 'Webhook Logs', href: '' },
  ];

  const helpSections = [
    {
      title: 'Understanding Logs',
      content: 'View all webhook delivery attempts with timestamps, status codes, and response data. Green badges indicate successful deliveries (2xx status), red badges show failures.',
    },
    {
      title: 'Retrying Failed Webhooks',
      content: 'Click the Retry button on any failed webhook to attempt redelivery. The system will send the same payload to the endpoint again.',
    },
    {
      title: 'Status Codes',
      content: '200-299: Success, 400-499: Client errors (check your endpoint), 500-599: Server errors (temporary issues, safe to retry).',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Webhook Logs" />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/integrations">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Heading
              title={integration ? `Webhook Logs - ${integration.name}` : 'Webhook Logs'}
              description="View delivery history and retry failed webhooks"
            />
          </div>
          <PageHelp 
            title="Webhook Logs Help" 
            sections={helpSections}
            documentationUrl="/docs/documentation.html#crm-integrations"
          />
        </div>

        {/* Logs */}
        {logs.data.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground">No webhook logs yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {logs.data.map((log) => (
              <Card key={log.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {isSuccess(log) ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        {log.event_type}
                        {log.response_status && (
                          <Badge variant={isSuccess(log) ? 'default' : 'destructive'}>
                            HTTP {log.response_status}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {format(new Date(log.triggered_at), 'MMM d, yyyy HH:mm:ss')}
                        {log.crm_integration && ` • ${log.crm_integration.name}`}
                      </CardDescription>
                    </div>
                    {!isSuccess(log) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetry(log.id)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Response */}
                  {log.response_body && (
                    <div>
                      <p className="mb-2 text-sm font-medium">Response</p>
                      <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">
                        {log.response_body.substring(0, 500)}
                        {log.response_body.length > 500 && '...'}
                      </pre>
                    </div>
                  )}

                  {/* Payload (collapsed) */}
                  <details>
                    <summary className="cursor-pointer text-sm font-medium">View Payload</summary>
                    <pre className="mt-2 rounded-md bg-muted p-3 text-xs overflow-x-auto">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {logs.last_page > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: logs.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`?page=${page}`}
                className={`rounded-md px-3 py-2 text-sm ${
                  page === logs.current_page
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
