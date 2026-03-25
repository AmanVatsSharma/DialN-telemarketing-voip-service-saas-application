import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

interface PageProps extends Record<string, unknown> {
    appName?: string;
    appLogo?: string;
}

export default function AppLogo() {
    const { props } = usePage<PageProps>();
    const appName = props.appName || 'DialN';
    const appLogo = props.appLogo;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                {appLogo ? (
                    <img 
                        src={appLogo} 
                        alt={appName}
                        className="size-8 object-contain"
                    />
                ) : (
                    <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                )}
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {appName}
                </span>
            </div>
        </>
    );
}
