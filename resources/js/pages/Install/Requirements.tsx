import React from 'react';
import { router } from '@inertiajs/react';
import InstallLayout from '@/layouts/InstallLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RequirementItem {
  name: string;
  passed: boolean;
  current?: string;
}

interface RequirementGroup {
  title: string;
  items: RequirementItem[];
}

interface Requirements {
  php: RequirementGroup;
  extensions: RequirementGroup;
  permissions: RequirementGroup;
  files: RequirementGroup;
}

interface Props {
  requirements: Requirements;
}

export default function Requirements({ requirements }: Props) {
  const allPassed = Object.values(requirements).every((group) =>
    group.items.every((item: RequirementItem) => item.passed)
  );

  const handleNext = () => {
    router.post('/install/requirements/check');
  };

  const renderRequirementItem = (item: RequirementItem) => (
    <div
      key={item.name}
      className="flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0"
    >
      <div className="flex items-center space-x-3">
        {item.passed ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
      </div>
      {item.current && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {item.current}
        </span>
      )}
    </div>
  );

  return (
    <InstallLayout title="Requirements Check" step={1}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            System Requirements
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please ensure all requirements are met before proceeding with the installation.
          </p>
        </div>

        {!allPassed && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Some requirements are not met. Please fix the issues below before continuing.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* PHP Requirements */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {requirements.php.title}
            </h3>
            <div className="space-y-1">
              {requirements.php.items.map(renderRequirementItem)}
            </div>
          </div>

          {/* PHP Extensions */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {requirements.extensions.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {requirements.extensions.items.map(renderRequirementItem)}
            </div>
          </div>

          {/* Directory Permissions */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {requirements.permissions.title}
            </h3>
            <div className="space-y-1">
              {requirements.permissions.items.map(renderRequirementItem)}
            </div>
          </div>

          {/* Required Files */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {requirements.files.title}
            </h3>
            <div className="space-y-1">
              {requirements.files.items.map(renderRequirementItem)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNext}
            disabled={!allPassed}
            size="lg"
            className="px-8"
          >
            Next: Database Setup
          </Button>
        </div>
      </div>
    </InstallLayout>
  );
}
