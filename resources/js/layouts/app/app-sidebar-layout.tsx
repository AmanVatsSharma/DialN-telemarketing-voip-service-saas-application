import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ImpersonationBanner } from '@/components/impersonation-banner';
import { SoftphoneProvider } from '@/contexts/SoftphoneContext';
import { SoftphoneWidget } from '@/components/softphone/SoftphoneWidget';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <SoftphoneProvider>
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <ImpersonationBanner />
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
            
            {/* Global Softphone Widget - Available on all pages */}
            <SoftphoneWidget />
        </SoftphoneProvider>
    );
}
