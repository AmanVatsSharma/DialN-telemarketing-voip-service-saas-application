import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FileAudio,
    Folder,
    Home,
    Megaphone,
    Phone,
    PhoneCall,
    BarChart3,
    Users,
    Shield,
    ShieldCheck,
    UserCog,
    Wallet,
    CreditCard,
    DollarSign,
    TrendingUp,
    PhoneIncoming,
    Tag,
    Activity,
    Paintbrush,
    AlertTriangle,
    Workflow,
    Plug,
    Bot,
    Radio,
    History,
    Flame,
    Clock,
    MessageSquare,
    FileText,
    Settings,
    Network
} from 'lucide-react';
import AppLogo from './app-logo';
import { useAuth } from '@/hooks/useAuth';

const useMainNavItems = (): NavItem[] => {
    const { isAdmin, isCustomer } = useAuth();

    const allItems: NavItem[] = [
        // ==================== DASHBOARD (Standalone) ====================
        {
            title: 'Home',
            href: dashboard(),
            icon: Home,
            visible: true,
        },

        // ==================== COMMUNICATION GROUP ====================
        {
            title: 'Communication',
            isGroup: true,
            visible: true,
            items: [
                {
                    title: 'Softphone',
                    href: '/softphone',
                    icon: Phone,
                    visible: true,
                },
                {
                    title: 'History',
                    href: '/calls',
                    icon: PhoneCall,
                    visible: true,
                },
                // Phone Numbers with nested items - SECURITY FIX: Agents should NOT see this
                {
                    title: 'Phone Numbers',
                    icon: PhoneIncoming,
                    visible: isCustomer(),
                    items: [
                        {
                            title: 'My Numbers',
                            href: '/numbers/my-numbers',
                            icon: PhoneIncoming,
                            visible: isCustomer(),
                        },
                        {
                            title: 'Request New',
                            href: '/numbers/available',
                            icon: Tag,
                            visible: isCustomer(),
                        },
                    ],
                },
                
                // My Call History
                {
                    title: 'My Call History',
                    href: '/my-calls',
                    icon: PhoneCall,
                    visible: isCustomer(),
                },
            ],
        },

        // ==================== CONVERSATIONAL AI GROUP ====================
        {
            title: 'Conversational AI',
            isGroup: true,
            visible: true,
            badge: 'NEW',
            items: [
                {
                    title: 'AI Agents',
                    href: '/ai-agents',
                    icon: Bot,
                    visible: true,
                },
                {
                    title: 'Knowledge Base',
                    href: '/knowledge-bases',
                    icon: BookOpen,
                    visible: true,
                },
                {
                    title: 'Live Calls',
                    href: '/ai-agents/live',
                    icon: Radio,
                    visible: true,
                },
                {
                    title: 'Call History',
                    href: '/ai-agents/calls',
                    icon: History,
                    visible: true,
                },
            ],
        },

        // ==================== CAMPAIGNS GROUP ====================
        {
            title: 'Campaigns',
            isGroup: true,
            visible: true,
            items: [
                {
                    title: 'All Campaigns',
                    href: '/campaigns',
                    icon: Megaphone,
                    visible: true,
                },
                {
                    title: 'Sequences',
                    href: '/sequences',
                    icon: Workflow,
                    visible: true,
                    badge: 'NEW',
                },
                {
                    title: 'Templates',
                    href: '/campaign-templates',
                    icon: BookOpen,
                    visible: isAdmin() || isCustomer(),
                },
                {
                    title: 'Analytics',
                    icon: BarChart3,
                    visible: true,
                    items: [
                        {
                            title: 'Overview',
                            href: '/analytics/dashboard',
                            icon: BarChart3,
                            visible: true,
                        },
                        {
                            title: 'Hot Leads',
                            href: '/analytics/hot-leads',
                            icon: Flame,
                            visible: true,
                            badge: 'NEW',
                        },
                        {
                            title: 'Smart Scheduling',
                            href: '/analytics/smart-scheduling',
                            icon: Clock,
                            visible: true,
                            badge: 'NEW',
                        },
                    ],
                },
            ],
        },
        {
            title: 'SMS',
            isGroup: true,
            visible: true,
            badge: 'NEW',
            items: [
                {
                    title: 'Phone Numbers',
                    href: '/sms',
                    icon: Phone,
                    visible: true,
                },
                {
                    title: 'Conversations',
                    href: '/sms/conversations',
                    icon: MessageSquare,
                    visible: true,
                },
                {
                    title: 'Templates',
                    href: '/sms/templates',
                    icon: FileText,
                    visible: true,
                },
                {
                    title: 'Analytics',
                    href: '/sms/analytics',
                    icon: BarChart3,
                    visible: true,
                },
            ],
        },

        // ==================== CONTACTS GROUP ====================
        {
            title: 'Contacts',
            isGroup: true,
            visible: true,
            items: [
                {
                    title: 'All Contacts',
                    href: '/contacts',
                    icon: Users,
                    visible: true,
                },
                {
                    title: 'Contact Lists',
                    href: '/contact-lists',
                    icon: Folder,
                    visible: isAdmin() || isCustomer(),
                },
            ],
        },

        // ==================== INTEGRATIONS GROUP ====================
        {
            title: 'Integrations',
            isGroup: true,
            visible: true,
            badge: 'NEW',
            items: [
                {
                    title: 'CRM Integrations',
                    href: '/integrations',
                    icon: Plug,
                    visible: true,
                },
                {
                    title: 'SIP Trunk',
                    href: '/sip-trunk',
                    icon: Network,
                    visible: isAdmin(), // Admin only - manages trunk for all customers
                    badge: 'NEW',
                },
            ],
        },

        // ==================== RESOURCES GROUP ====================
        {
            title: 'Resources',
            isGroup: true,
            visible: true,
            items: [
                {
                    title: 'Audio Files',
                    href: '/audio-files',
                    icon: FileAudio,
                    visible: true,
                },
            ],
        },

        // ==================== BILLING GROUP - SECURITY FIX: Agents should NOT see this ====================
        {
            title: 'Billing',
            isGroup: true,
            visible: isCustomer(),
            items: [
                {
                    title: 'My Credits',
                    href: '/credit',
                    icon: Wallet,
                    visible: isCustomer(),
                },
                {
                    title: 'Top Up',
                    href: '/credit/top-up',
                    icon: CreditCard,
                    visible: isCustomer(),
                },
                {
                    title: 'Account Statement',
                    href: '/credit/history',
                    icon: DollarSign,
                    visible: isCustomer(),
                },
            ],
        },

        // ==================== MY TEAM GROUP (Customer) ====================
        {
            title: 'My Team',
            isGroup: true,
            visible: isCustomer(),
            items: [
                {
                    title: 'Agents',
                    href: '/agents',
                    icon: Users,
                    visible: isCustomer(),
                },
            ],
        },

        // ==================== ADMIN SEPARATOR ====================
        {
            title: 'Administration',
            isSeparator: true,
            visible: isAdmin(),
        },

        // ==================== ADMIN: USER MANAGEMENT ====================
        {
            title: 'User Management',
            isGroup: true,
            visible: isAdmin(),
            items: [
                {
                    title: 'Users',
                    href: '/users',
                    icon: UserCog,
                    visible: isAdmin(),
                },
                {
                    title: 'Roles & Permissions',
                    href: '/roles',
                    icon: Shield,
                    visible: isAdmin(),
                },
                {
                    title: 'KYC Review',
                    href: '/admin/kyc',
                    icon: ShieldCheck,
                    visible: isAdmin(),
                    badge: 'NEW',
                },
            ],
        },

        // ==================== ADMIN: PHONE MANAGEMENT ====================
        {
            title: 'Phone Management',
            isGroup: true,
            visible: isAdmin(),
            items: [
                {
                    title: 'Number Inventory',
                    href: '/admin/numbers',
                    icon: PhoneIncoming,
                    visible: isAdmin(),
                },
                {
                    title: 'Number Requests',
                    href: '/admin/number-requests',
                    icon: Tag,
                    visible: isAdmin(),
                },
            ],
        },

        // ==================== ADMIN: FINANCIAL MANAGEMENT ====================
        {
            title: 'Financial Management',
            isGroup: true,
            visible: isAdmin(),
            items: [
                {
                    title: 'Credit Management',
                    href: '/admin/credit-management',
                    icon: Wallet,
                    visible: isAdmin(),
                },
                {
                    title: 'All Transactions',
                    href: '/admin/credit-management/transactions',
                    icon: DollarSign,
                    visible: isAdmin(),
                },
                {
                    title: 'Pricing & Rates',
                    href: '/admin/pricing',
                    icon: DollarSign,
                    visible: isAdmin(),
                },
                {
                    title: 'Profit Tracking',
                    href: '/admin/profit-analytics',
                    icon: TrendingUp,
                    visible: isAdmin(),
                },
            ],
        },

        // ==================== ADMIN: SYSTEM MONITORING ====================
        {
            title: 'System Monitoring',
            isGroup: true,
            visible: isAdmin(),
            items: [
                {
                    title: 'Call Logs',
                    href: '/admin/call-logs',
                    icon: PhoneCall,
                    visible: isAdmin(),
                },
                {
                    title: 'Error Logs',
                    href: '/admin/error-logs',
                    icon: AlertTriangle,
                    visible: isAdmin(),
                },
                {
                    title: 'Cron Jobs',
                    href: '/admin/cron-monitor',
                    icon: Activity,
                    visible: isAdmin(),
                },
            ],
        },

        // ==================== ADMIN: INTEGRATIONS ====================
        {
            title: 'Integrations',
            isGroup: true,
            visible: isAdmin(),
            items: [
                {
                    title: 'Twilio Settings',
                    href: '/settings/twilio',
                    icon: Phone,
                    visible: isAdmin(),
                },
                {
                    title: 'System Config',
                    href: '/admin/system-config',
                    icon: CreditCard,
                    visible: isAdmin(),
                },
            ],
        },

        // ==================== ADMIN: THEME MANAGEMENT ====================
        {
            title: 'Theme Management',
            isGroup: true,
            visible: isAdmin(),
            items: [
                {
                    title: 'Theme Settings',
                    href: '/admin/theme',
                    icon: Paintbrush,
                    visible: isAdmin(),
                },
            ],
        },
    ];

    // Filter out items and nested items based on visibility
    return allItems
        .filter((item) => item.visible !== false)
        .map((item) => {
            if (item.items) {
                // Filter nested items
                const visibleItems = item.items
                    .filter((subItem) => subItem.visible !== false)
                    .map((subItem) => {
                        // Handle nested items within nested items (Phone Numbers)
                        if (subItem.items) {
                            return {
                                ...subItem,
                                items: subItem.items.filter((child) => child.visible !== false),
                            };
                        }
                        return subItem;
                    })
                    .filter((subItem) => !subItem.items || subItem.items.length > 0);

                // Hide group if no visible items
                if (visibleItems.length === 0 && item.isGroup) {
                    return null;
                }

                return { ...item, items: visibleItems };
            }
            return item;
        })
        .filter((item): item is NavItem => item !== null);
};

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const mainNavItems = useMainNavItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
