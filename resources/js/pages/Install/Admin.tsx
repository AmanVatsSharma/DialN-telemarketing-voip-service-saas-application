import React from 'react';
import { router, useForm } from '@inertiajs/react';
import InstallLayout from '@/layouts/InstallLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, UserCog } from 'lucide-react';

export default function AdminSetup() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const generalError = (errors as Record<string, string>).error;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/install/admin/create');
  };

  return (
    <InstallLayout title="Create Admin User" step={3}>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <UserCog className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Admin User
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Set up your administrator account
            </p>
          </div>
        </div>

        {generalError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This will be your main administrator account. Make sure to use a strong password.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Admin Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="John Doe"
              className="mt-1"
              required
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Admin Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              placeholder="admin@example.com"
              className="mt-1"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Enter a strong password (min. 8 characters)"
              className="mt-1"
              required
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              placeholder="Re-enter your password"
              className="mt-1"
              required
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit('/install/database')}
              disabled={processing}
            >
              Back
            </Button>

            <Button type="submit" disabled={processing} size="lg">
              {processing ? 'Creating Admin...' : 'Complete Installation'}
            </Button>
          </div>
        </form>
      </div>
    </InstallLayout>
  );
}
