import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import InstallLayout from '@/layouts/InstallLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Loader2, Database } from 'lucide-react';

interface Props {
  env: {
    DB_HOST: string;
    DB_PORT: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
  };
}

export default function DatabaseConfig({ env }: Props) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm({
    host: env.DB_HOST || '127.0.0.1',
    port: env.DB_PORT || '3306',
    database: env.DB_DATABASE || '',
    username: env.DB_USERNAME || '',
    password: '',
  });

  const testForm = useForm({
    host: env.DB_HOST || '127.0.0.1',
    port: env.DB_PORT || '3306',
    database: env.DB_DATABASE || '',
    username: env.DB_USERNAME || '',
    password: '',
  });

  const handleTestConnection = () => {
    setTesting(true);
    setTestResult(null);

    // Sync test form data with main form
    testForm.setData(form.data);

    testForm.post('/install/database/test', {
      preserveScroll: true,
      onSuccess: (page: any) => {
        setTestResult({
          success: true,
          message: page.props?.flash?.message || 'Database connection successful!',
        });
        setTesting(false);
      },
      onError: (errors: any) => {
        setTestResult({
          success: false,
          message: errors?.message || Object.values(errors)[0] as string || 'Connection test failed',
        });
        setTesting(false);
      },
    });
  };

  const handleMigrate = () => {
    form.post('/install/database/migrate', {
      onError: (errors: any) => {
        setTestResult({
          success: false,
          message: errors?.message || Object.values(errors)[0] as string || 'Migration failed',
        });
      },
    });
  };

  const canMigrate = testResult?.success === true;

  return (
    <InstallLayout title="Database Configuration" step={2}>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Database className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Database Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your database connection settings
            </p>
          </div>
        </div>

        {testResult && (
          <Alert variant={testResult.success ? 'default' : 'destructive'}>
            {testResult.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {/* Database Host */}
          <div>
            <Label htmlFor="host">Database Host</Label>
            <Input
              id="host"
              type="text"
              value={form.data.host}
              onChange={(e) => form.setData('host', e.target.value)}
              placeholder="127.0.0.1"
              className="mt-1"
            />
            {form.errors.host && (
              <p className="text-sm text-red-600 mt-1">{form.errors.host}</p>
            )}
          </div>

          {/* Database Port */}
          <div>
            <Label htmlFor="port">Database Port</Label>
            <Input
              id="port"
              type="text"
              value={form.data.port}
              onChange={(e) => form.setData('port', e.target.value)}
              placeholder="3306"
              className="mt-1"
            />
            {form.errors.port && (
              <p className="text-sm text-red-600 mt-1">{form.errors.port}</p>
            )}
          </div>

          {/* Database Name */}
          <div>
            <Label htmlFor="database">Database Name</Label>
            <Input
              id="database"
              type="text"
              value={form.data.database}
              onChange={(e) => form.setData('database', e.target.value)}
              placeholder="DialN_ai"
              className="mt-1"
            />
            {form.errors.database && (
              <p className="text-sm text-red-600 mt-1">{form.errors.database}</p>
            )}
          </div>

          {/* Database Username */}
          <div>
            <Label htmlFor="username">Database Username</Label>
            <Input
              id="username"
              type="text"
              value={form.data.username}
              onChange={(e) => form.setData('username', e.target.value)}
              placeholder="root"
              className="mt-1"
            />
            {form.errors.username && (
              <p className="text-sm text-red-600 mt-1">{form.errors.username}</p>
            )}
          </div>

          {/* Database Password */}
          <div>
            <Label htmlFor="password">Database Password</Label>
            <Input
              id="password"
              type="password"
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
              placeholder="Enter database password (if any)"
              className="mt-1"
            />
            {form.errors.password && (
              <p className="text-sm text-red-600 mt-1">{form.errors.password}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t dark:border-gray-700">
          <Button
            variant="outline"
            onClick={() => router.visit('/install/requirements')}
          >
            Back
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={testing || form.processing}
            >
              {testing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Connection
            </Button>

            <Button
              onClick={handleMigrate}
              disabled={!canMigrate || form.processing}
            >
              {form.processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {form.processing ? 'Migrating Database...' : 'Next: Create Admin'}
            </Button>
          </div>
        </div>

        {form.processing && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Running database migrations and seeders. This may take a few moments...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </InstallLayout>
  );
}
