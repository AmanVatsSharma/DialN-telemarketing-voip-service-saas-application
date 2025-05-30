<?php

declare(strict_types=1);

namespace App\Helpers;

use App\Models\ThemeSetting;
use Illuminate\Support\Facades\Storage;

class AppHelper
{
    /**
     * Get application logo URL from ThemeSetting
     * 
     * @return string|null Logo URL or null if not set
     */
    public static function getLogoUrl(): ?string
    {
        try {
            $settings = ThemeSetting::first();
            
            if ($settings && $settings->logo_path) {
                // Use the logo_url accessor which handles the full URL generation
                return $settings->logo_url;
            }
        } catch (\Exception $e) {
            // Table might not exist during installation
            \Log::debug('Failed to fetch logo from ThemeSetting: ' . $e->getMessage());
        }
        
        return null;
    }

    /**
     * Get application favicon URL
     * 
     * @return string Favicon URL (defaults to favicon.ico if not set)
     */
    public static function getFaviconUrl(): string
    {
        try {
            $settings = ThemeSetting::first();
            
            if ($settings) {
                // Use the favicon_url accessor which handles the full URL generation
                return $settings->favicon_url;
            }
        } catch (\Exception $e) {
            // Table might not exist during installation
            \Log::debug('Failed to fetch favicon from ThemeSetting: ' . $e->getMessage());
        }
        
        return asset('favicon.ico');
    }

    /**
     * Get application name
     * 
     * @return string Application name
     */
    public static function getAppName(): string
    {
        try {
            $settings = ThemeSetting::first();
            
            if ($settings && $settings->site_name) {
                return $settings->site_name;
            }
        } catch (\Exception $e) {
            \Log::debug('Failed to fetch app name from ThemeSetting: ' . $e->getMessage());
        }
        
        return config('app.name', 'DialN AI');
    }
}
