import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Settings, CreditCard, Mail, Globe, Send, AlertCircle, CheckCircle2, Upload, Image as ImageIcon } from 'lucide-react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { useState, useRef, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'System Configuration',
    href: '/admin/system-config',
  },
];

interface SystemConfigProps {
  config: {
    stripe: {
      key: string;
      secret: string;
    };
    razorpay: {
      key: string;
      secret: string;
      webhook_secret: string;
      test_mode: boolean;
    };
    mail: {
      mailer: string;
      host: string;
      port: number;
      username: string;
      password: string;
      encryption: string;
      from_address: string;
      from_name: string;
    };
    application: {
      name: string;
      url: string;
      timezone: string;
      locale: string;
      debug: boolean;
      environment: string;
      logo?: string;
      favicon?: string;
    };
  };
}

export default function SystemConfig({ config }: SystemConfigProps) {
  const { flash } = usePage().props as any;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(config.application.logo || null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(config.application.favicon || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // Show flash messages
  useEffect(() => {
    if (flash?.success) {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
    }
    if (flash?.error) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
    }
  }, [flash]);

  const stripeForm = useForm({
    section: 'stripe',
    config: {
      key: config.stripe.key,
      secret: config.stripe.secret,
    },
  });

  const razorpayForm = useForm({
    section: 'razorpay',
    config: {
      key: config.razorpay.key,
      secret: config.razorpay.secret,
      webhook_secret: config.razorpay.webhook_secret,
      test_mode: config.razorpay.test_mode,
    },
  });

  const mailForm = useForm({
    section: 'mail',
    config: {
      mailer: config.mail.mailer,
      host: config.mail.host,
      port: config.mail.port,
      username: config.mail.username,
      password: config.mail.password,
      encryption: config.mail.encryption,
      from_address: config.mail.from_address,
      from_name: config.mail.from_name,
    },
  });

  const appForm = useForm({
    section: 'application',
    config: {
      name: config.application.name,
      url: config.application.url,
      timezone: config.application.timezone,
      locale: config.application.locale,
      debug: config.application.debug,
      environment: config.application.environment,
    },
    logo: null as File | null,
    favicon: null as File | null,
  });

  const [testEmail, setTestEmail] = useState('');

  const handleStripeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stripeForm.post('/admin/system-config', {
      preserveScroll: true,
      onSuccess: () => {
        // Flash message will be shown via useEffect
      },
      onError: () => {
        // Flash message will be shown via useEffect
      },
    });
  };

  const handleRazorpaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    razorpayForm.post('/admin/system-config', {
      preserveScroll: true,
      onSuccess: () => {
        // Flash message will be shown via useEffect
      },
      onError: () => {
        // Flash message will be shown via useEffect
      },
    });
  };

  const handleMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mailForm.post('/admin/system-config', {
      preserveScroll: true,
      onSuccess: () => {
        // Flash message will be shown via useEffect
      },
      onError: () => {
        // Flash message will be shown via useEffect
      },
    });
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appForm.post('/admin/system-config', {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        // Flash message will be shown via useEffect
      },
      onError: () => {
        // Flash message will be shown via useEffect
      },
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      appForm.setData('logo', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      appForm.setData('favicon', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) return;
    
    setTestEmailSending(true);
    setTestEmailResult(null);

    try {
      const response = await window.axios.post('/admin/system-config/test-mail', {
        email: testEmail,
      });

      setTestEmailResult({
        success: true,
        message: response.data.message,
      });
    } catch (error: unknown) {
      let errorMessage = 'Failed to send test email';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      
      setTestEmailResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      setTestEmailSending(false);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="System Configuration" />
      
      <div className="mx-auto max-w-5xl">
        <Heading 
          title="System Configuration" 
          description="Manage system-wide settings and integrations"
        />

        {/* Success Alert */}
        {showSuccessAlert && flash?.success && (
          <Alert className="mb-6 border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
            <AlertDescription className="text-green-900 dark:text-green-100">
              {flash.success}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {showErrorAlert && flash?.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {flash.error}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="stripe" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stripe" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Stripe</span>
            </TabsTrigger>
            <TabsTrigger value="razorpay" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Razorpay</span>
            </TabsTrigger>
            <TabsTrigger value="mail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Mail</span>
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Application</span>
            </TabsTrigger>
          </TabsList>

          {/* Stripe Configuration */}
          <TabsContent value="stripe">
            <form onSubmit={handleStripeSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Stripe Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure Stripe payment gateway for processing payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Get your Stripe credentials from{' '}
                      <a
                        href="https://dashboard.stripe.com/apikeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline"
                      >
                        Stripe Dashboard
                      </a>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="stripe_key">Publishable Key</Label>
                    <Input
                      id="stripe_key"
                      type="text"
                      value={stripeForm.data.config.key}
                      onChange={(e) => stripeForm.setData('config', {
                        ...stripeForm.data.config,
                        key: e.target.value,
                      })}
                      placeholder="pk_test_..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stripe_secret">Secret Key</Label>
                    <Input
                      id="stripe_secret"
                      type="password"
                      value={stripeForm.data.config.secret}
                      onChange={(e) => stripeForm.setData('config', {
                        ...stripeForm.data.config,
                        secret: e.target.value,
                      })}
                      placeholder="sk_test_..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave as dots to keep existing value
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={stripeForm.processing}>
                      <Settings className="mr-2 h-4 w-4" />
                      Save Stripe Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* Razorpay Configuration */}
          <TabsContent value="razorpay">
            <form onSubmit={handleRazorpaySubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Razorpay Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure Razorpay payment gateway for processing payments in India
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Get your Razorpay credentials from{' '}
                      <a
                        href="https://dashboard.razorpay.com/app/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline"
                      >
                        Razorpay Dashboard
                      </a>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="razorpay_key">API Key (Key ID)</Label>
                    <Input
                      id="razorpay_key"
                      type="text"
                      value={razorpayForm.data.config.key}
                      onChange={(e) => razorpayForm.setData('config', {
                        ...razorpayForm.data.config,
                        key: e.target.value,
                      })}
                      placeholder="rzp_test_..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razorpay_secret">Secret Key</Label>
                    <Input
                      id="razorpay_secret"
                      type="password"
                      value={razorpayForm.data.config.secret}
                      onChange={(e) => razorpayForm.setData('config', {
                        ...razorpayForm.data.config,
                        secret: e.target.value,
                      })}
                      placeholder="Your Razorpay secret key..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave as dots to keep existing value
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razorpay_webhook_secret">Webhook Secret (Optional)</Label>
                    <Input
                      id="razorpay_webhook_secret"
                      type="password"
                      value={razorpayForm.data.config.webhook_secret}
                      onChange={(e) => razorpayForm.setData('config', {
                        ...razorpayForm.data.config,
                        webhook_secret: e.target.value,
                      })}
                      placeholder="Your webhook secret..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Required for webhook signature verification. Get from webhook settings.
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="razorpay_test_mode">Test Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable test mode to use test API keys
                      </p>
                    </div>
                    <Switch
                      id="razorpay_test_mode"
                      checked={razorpayForm.data.config.test_mode}
                      onCheckedChange={(checked) => razorpayForm.setData('config', {
                        ...razorpayForm.data.config,
                        test_mode: checked,
                      })}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={razorpayForm.processing}>
                      <Settings className="mr-2 h-4 w-4" />
                      Save Razorpay Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* Mail Configuration */}
          <TabsContent value="mail">
            <form onSubmit={handleMailSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Mail Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure SMTP settings for sending emails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mail_mailer">Mailer</Label>
                      <Select
                        value={mailForm.data.config.mailer}
                        onValueChange={(value) => mailForm.setData('config', {
                          ...mailForm.data.config,
                          mailer: value,
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="log">Log (Testing)</SelectItem>
                          <SelectItem value="smtp">SMTP</SelectItem>
                          <SelectItem value="sendmail">Sendmail</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="ses">Amazon SES</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Use "Log" for testing without sending real emails
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mail_encryption">Encryption</Label>
                      <Select
                        value={mailForm.data.config.encryption}
                        onValueChange={(value) => mailForm.setData('config', {
                          ...mailForm.data.config,
                          encryption: value,
                        })}
                        disabled={mailForm.data.config.mailer === 'log'}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS (Recommended)</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Use TLS for port 587, SSL for port 465
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mail_host">SMTP Host</Label>
                      <Input
                        id="mail_host"
                        type="text"
                        value={mailForm.data.config.host}
                        onChange={(e) => mailForm.setData('config', {
                          ...mailForm.data.config,
                          host: e.target.value,
                        })}
                        placeholder="smtp.gmail.com"
                        disabled={mailForm.data.config.mailer === 'log'}
                      />
                      <p className="text-xs text-muted-foreground">
                        SMTP server hostname (e.g., smtp.gmail.com, smtp.mailtrap.io)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mail_port">SMTP Port</Label>
                      <Input
                        id="mail_port"
                        type="number"
                        value={mailForm.data.config.port}
                        onChange={(e) => mailForm.setData('config', {
                          ...mailForm.data.config,
                          port: parseInt(e.target.value) || 2525,
                        })}
                        placeholder="587"
                        disabled={mailForm.data.config.mailer === 'log'}
                      />
                      <p className="text-xs text-muted-foreground">
                        Common: 587 (TLS), 465 (SSL), 25 (plain)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mail_username">Username</Label>
                    <Input
                      id="mail_username"
                      type="text"
                      value={mailForm.data.config.username === 'null' ? '' : mailForm.data.config.username}
                      onChange={(e) => mailForm.setData('config', {
                        ...mailForm.data.config,
                        username: e.target.value || 'null',
                      })}
                      placeholder="your-email@gmail.com"
                      disabled={mailForm.data.config.mailer === 'log'}
                    />
                    <p className="text-xs text-muted-foreground">
                      SMTP authentication username (leave empty for none)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mail_password">Password</Label>
                    <Input
                      id="mail_password"
                      type="password"
                      value={mailForm.data.config.password === '••••••••' || mailForm.data.config.password === 'null' ? '' : mailForm.data.config.password}
                      onChange={(e) => mailForm.setData('config', {
                        ...mailForm.data.config,
                        password: e.target.value || '••••••••',
                      })}
                      placeholder="Enter new password"
                      disabled={mailForm.data.config.mailer === 'log'}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to keep existing password
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mail_from_address">From Address</Label>
                      <Input
                        id="mail_from_address"
                        type="email"
                        value={mailForm.data.config.from_address}
                        onChange={(e) => mailForm.setData('config', {
                          ...mailForm.data.config,
                          from_address: e.target.value,
                        })}
                        placeholder="noreply@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mail_from_name">From Name</Label>
                      <Input
                        id="mail_from_name"
                        type="text"
                        value={mailForm.data.config.from_name}
                        onChange={(e) => mailForm.setData('config', {
                          ...mailForm.data.config,
                          from_name: e.target.value,
                        })}
                        placeholder="DialN AI"
                      />
                    </div>
                  </div>

                  {/* Test Email Section */}
                  <div className="border-t pt-4 mt-4">
                    <Label htmlFor="test_email">Test Email</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="test_email"
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="test@example.com"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleTestEmail}
                        disabled={!testEmail || testEmailSending}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {testEmailSending ? 'Sending...' : 'Send Test'}
                      </Button>
                    </div>
                    {testEmailResult && (
                      <Alert className={`mt-2 ${testEmailResult.success ? 'border-green-200 bg-green-50' : ''}`} variant={testEmailResult.success ? 'default' : 'destructive'}>
                        {testEmailResult.success ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription className={testEmailResult.success ? 'text-green-800' : ''}>
                          {testEmailResult.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={mailForm.processing}>
                      <Settings className="mr-2 h-4 w-4" />
                      Save Mail Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* Application Settings */}
          <TabsContent value="application">
            <form onSubmit={handleAppSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Application Settings
                  </CardTitle>
                  <CardDescription>
                    Configure general application settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app_name">Application Name</Label>
                    <Input
                      id="app_name"
                      type="text"
                      value={appForm.data.config.name}
                      onChange={(e) => appForm.setData('config', {
                        ...appForm.data.config,
                        name: e.target.value,
                      })}
                      placeholder="DialN AI"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app_logo">Application Logo</Label>
                    <div className="flex items-start gap-4">
                      {logoPreview && (
                        <div className="shrink-0">
                          <img 
                            src={logoPreview.startsWith('blob:') ? logoPreview : `/${logoPreview}`} 
                            alt="Logo preview" 
                            className="h-16 w-16 rounded border object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <Input
                          ref={fileInputRef}
                          id="app_logo"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                          onChange={handleLogoChange}
                          className="cursor-pointer"
                        />
                        <p className="text-sm text-muted-foreground">
                          Upload a logo (PNG, JPG, JPEG, or SVG, max 2MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app_favicon">Favicon</Label>
                    <div className="flex items-start gap-4">
                      {faviconPreview && (
                        <div className="shrink-0 flex items-center justify-center h-16 w-16 rounded border bg-white p-2">
                          <img 
                            src={faviconPreview.startsWith('blob:') ? faviconPreview : `/${faviconPreview}`} 
                            alt="Favicon preview" 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <Input
                          ref={faviconInputRef}
                          id="app_favicon"
                          type="file"
                          accept="image/x-icon,image/png,image/jpeg,image/jpg"
                          onChange={handleFaviconChange}
                          className="cursor-pointer"
                        />
                        <p className="text-sm text-muted-foreground">
                          Upload a favicon (ICO, PNG, JPG, max 1MB, recommended 32x32px)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app_url">Application URL</Label>
                    <Input
                      id="app_url"
                      type="url"
                      value={appForm.data.config.url}
                      onChange={(e) => appForm.setData('config', {
                        ...appForm.data.config,
                        url: e.target.value,
                      })}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="app_timezone">Timezone</Label>
                      <Input
                        id="app_timezone"
                        type="text"
                        value={appForm.data.config.timezone}
                        onChange={(e) => appForm.setData('config', {
                          ...appForm.data.config,
                          timezone: e.target.value,
                        })}
                        placeholder="UTC"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="app_locale">Locale</Label>
                      <Input
                        id="app_locale"
                        type="text"
                        value={appForm.data.config.locale}
                        onChange={(e) => appForm.setData('config', {
                          ...appForm.data.config,
                          locale: e.target.value,
                        })}
                        placeholder="en"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="app_environment">Environment</Label>
                      <Select
                        value={appForm.data.config.environment}
                        onValueChange={(value) => appForm.setData('config', {
                          ...appForm.data.config,
                          environment: value,
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="local">Local</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id="app_debug"
                        checked={appForm.data.config.debug}
                        onCheckedChange={(checked) => appForm.setData('config', {
                          ...appForm.data.config,
                          debug: checked,
                        })}
                      />
                      <Label htmlFor="app_debug" className="cursor-pointer">
                        Debug Mode
                      </Label>
                    </div>
                  </div>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Debug mode should be disabled in production environments
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={appForm.processing}>
                      <Settings className="mr-2 h-4 w-4" />
                      Save Application Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
