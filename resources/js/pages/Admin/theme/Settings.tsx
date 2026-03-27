import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

interface ThemeSettings {
    id: number;
    site_name: string;
    site_tagline: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    logo_path: string | null;
    favicon_path: string | null;
    og_image_path: string | null;
    twitter_card: string | null;
    twitter_site: string | null;
    google_analytics_id: string | null;
    google_tag_manager_id: string | null;
    facebook_pixel_id: string | null;
    custom_head_scripts: string | null;
    custom_body_scripts: string | null;
    primary_color: string;
    secondary_color: string;
    can_register: boolean;
    copyright_text: string | null;
}

interface SettingsProps {
    settings: ThemeSettings;
}

export default function ThemeSettings({ settings }: SettingsProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Theme', href: '/admin/theme' },
        { title: 'Settings', href: '/admin/theme/settings' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        site_name: settings.site_name || '',
        site_tagline: settings.site_tagline || '',
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || '',
        logo_path: settings.logo_path || '',
        favicon_path: settings.favicon_path || '',
        og_image_path: settings.og_image_path || '',
        twitter_card: settings.twitter_card || 'summary_large_image',
        twitter_site: settings.twitter_site || '',
        google_analytics_id: settings.google_analytics_id || '',
        google_tag_manager_id: settings.google_tag_manager_id || '',
        facebook_pixel_id: settings.facebook_pixel_id || '',
        custom_head_scripts: settings.custom_head_scripts || '',
        custom_body_scripts: settings.custom_body_scripts || '',
        primary_color: settings.primary_color || '#3b82f6',
        secondary_color: settings.secondary_color || '#10b981',
        can_register: settings.can_register ?? true,
        copyright_text: settings.copyright_text || '© 2025 DialN AI. All rights reserved.',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/theme/settings');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Theme Settings" />

            <div className="mx-auto max-w-7xl space-y-6">
                <Heading
                    title="Theme Settings"
                    description="Customize your site's basic settings and branding"
                />

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Settings className="h-6 w-6" />
                            <CardTitle>Theme Settings</CardTitle>
                        </div>
                        <CardDescription>
                            Customize your site's basic settings and branding
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="site_name">Site Name</Label>
                                <Input
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    placeholder="My Awesome Site"
                                />
                                {errors.site_name && (
                                    <p className="text-sm text-red-600">{errors.site_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="site_tagline">Site Tagline</Label>
                                <Textarea
                                    id="site_tagline"
                                    value={data.site_tagline}
                                    onChange={(e) => setData('site_tagline', e.target.value)}
                                    placeholder="A brief tagline for your site..."
                                    rows={2}
                                />
                                {errors.site_tagline && (
                                    <p className="text-sm text-red-600">{errors.site_tagline}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="copyright_text">Copyright Text</Label>
                                <Textarea
                                    id="copyright_text"
                                    value={data.copyright_text}
                                    onChange={(e) => setData('copyright_text', e.target.value)}
                                    placeholder="© 2025 Your Company. All rights reserved."
                                    rows={2}
                                    maxLength={500}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {data.copyright_text?.length || 0}/500 characters
                                </p>
                                {errors.copyright_text && (
                                    <p className="text-sm text-red-600">{errors.copyright_text}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary_color">Primary Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="primary_color"
                                            type="color"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            placeholder="#3b82f6"
                                        />
                                    </div>
                                    {errors.primary_color && (
                                        <p className="text-sm text-red-600">{errors.primary_color}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="secondary_color">Secondary Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="secondary_color"
                                            type="color"
                                            value={data.secondary_color}
                                            onChange={(e) => setData('secondary_color', e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={data.secondary_color}
                                            onChange={(e) => setData('secondary_color', e.target.value)}
                                            placeholder="#10b981"
                                        />
                                    </div>
                                    {errors.secondary_color && (
                                        <p className="text-sm text-red-600">{errors.secondary_color}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Settings'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* SEO Settings Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>SEO & Meta Tags</CardTitle>
                        <CardDescription>
                            Configure search engine optimization and social media sharing
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="Your Site Name - Tagline"
                                    maxLength={255}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Recommended: 50-60 characters. This appears in search results and browser tabs.
                                </p>
                                {errors.meta_title && (
                                    <p className="text-sm text-red-600">{errors.meta_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="A compelling description of your site..."
                                    rows={3}
                                    maxLength={500}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Recommended: 150-160 characters. This appears in search results.
                                </p>
                                {errors.meta_description && (
                                    <p className="text-sm text-red-600">{errors.meta_description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                <Input
                                    id="meta_keywords"
                                    value={data.meta_keywords}
                                    onChange={(e) => setData('meta_keywords', e.target.value)}
                                    placeholder="keyword1, keyword2, keyword3"
                                    maxLength={500}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Comma-separated keywords relevant to your site.
                                </p>
                                {errors.meta_keywords && (
                                    <p className="text-sm text-red-600">{errors.meta_keywords}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="og_image_path">Social Share Image (OG Image)</Label>
                                <Input
                                    id="og_image_path"
                                    value={data.og_image_path}
                                    onChange={(e) => setData('og_image_path', e.target.value)}
                                    placeholder="/storage/theme/og-image.jpg"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Image displayed when sharing on social media. Recommended: 1200x630px.
                                </p>
                                {errors.og_image_path && (
                                    <p className="text-sm text-red-600">{errors.og_image_path}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="twitter_card">Twitter Card Type</Label>
                                    <Input
                                        id="twitter_card"
                                        value={data.twitter_card}
                                        onChange={(e) => setData('twitter_card', e.target.value)}
                                        placeholder="summary_large_image"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Usually: summary or summary_large_image
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="twitter_site">Twitter Handle</Label>
                                    <Input
                                        id="twitter_site"
                                        value={data.twitter_site}
                                        onChange={(e) => setData('twitter_site', e.target.value)}
                                        placeholder="@yourusername"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Your Twitter/X account handle
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save SEO Settings'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Analytics & Tracking Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics & Tracking</CardTitle>
                        <CardDescription>
                            Configure tracking pixels and analytics tools
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                                <Input
                                    id="google_analytics_id"
                                    value={data.google_analytics_id}
                                    onChange={(e) => setData('google_analytics_id', e.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Your Google Analytics 4 measurement ID
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="google_tag_manager_id">Google Tag Manager ID</Label>
                                <Input
                                    id="google_tag_manager_id"
                                    value={data.google_tag_manager_id}
                                    onChange={(e) => setData('google_tag_manager_id', e.target.value)}
                                    placeholder="GTM-XXXXXXX"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Your Google Tag Manager container ID
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                                <Input
                                    id="facebook_pixel_id"
                                    value={data.facebook_pixel_id}
                                    onChange={(e) => setData('facebook_pixel_id', e.target.value)}
                                    placeholder="123456789012345"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Your Facebook/Meta Pixel ID for ad tracking
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="custom_head_scripts">Custom Head Scripts</Label>
                                <Textarea
                                    id="custom_head_scripts"
                                    value={data.custom_head_scripts}
                                    onChange={(e) => setData('custom_head_scripts', e.target.value)}
                                    placeholder="<script>/* Your custom scripts */</script>"
                                    rows={5}
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Scripts to be added in the {"<head>"} section. Use for verification codes, etc.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="custom_body_scripts">Custom Body Scripts</Label>
                                <Textarea
                                    id="custom_body_scripts"
                                    value={data.custom_body_scripts}
                                    onChange={(e) => setData('custom_body_scripts', e.target.value)}
                                    placeholder="<script>/* Your custom scripts */</script>"
                                    rows={5}
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Scripts to be added before {"</body>"}. Use for chat widgets, etc.
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Analytics Settings'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
