import { Breadcrumbs } from '@/components/breadcrumbs';
import { CreditBalance } from '@/components/credit-balance';
import { GlobalSearch } from '@/components/global-search';
import { NotificationsDropdown } from '@/components/notifications-dropdown';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/40 bg-background/90 backdrop-blur-md px-6 sticky top-0 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-between gap-4">
                {/* Left side: Menu + Breadcrumbs */}
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Right side: Search, Notifications, Credits */}
                <div className="flex items-center gap-2 md:gap-3">
                    <GlobalSearch />
                    <NotificationsDropdown />
                    <CreditBalance />
                </div>
            </div>
        </header>
    );
}
