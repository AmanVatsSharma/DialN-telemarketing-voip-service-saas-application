import React from 'react';
import { router } from '@inertiajs/react';
import InstallLayout from '@/layouts/InstallLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Complete() {
  const handleGoToLogin = () => {
    router.visit('/login');
  };

  return (
    <InstallLayout title="Installation Complete">
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Installation Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your DialN AI application has been successfully installed.
          </p>
        </div>

        <Alert className="text-left">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <strong>What's next?</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Log in with your admin credentials</li>
              <li>Configure your Twilio settings in System Configuration</li>
              <li>Set up your payment gateway (Stripe)</li>
              <li>Customize your application appearance</li>
              <li>Start creating campaigns!</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Quick Links
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between py-2 border-b dark:border-gray-700">
              <span>Admin Panel:</span>
              <span className="font-mono">/dashboard</span>
            </div>
            <div className="flex justify-between py-2 border-b dark:border-gray-700">
              <span>System Configuration:</span>
              <span className="font-mono">/admin/system-config</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Documentation:</span>
              <span className="font-mono">/docs</span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button onClick={handleGoToLogin} size="lg" className="px-8">
            <Home className="mr-2 h-5 w-5" />
            Go to Login
          </Button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-500">
          Thank you for choosing DialN AI!
        </p>
      </div>
    </InstallLayout>
  );
}
