<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwilioController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Controllers\Settings\ApiKeyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');

    // Twilio Settings (No password protection - admin only via controller check)
    Route::get('settings/twilio', [TwilioController::class, 'show'])->name('twilio.settings');
    Route::post('settings/twilio/configure', [TwilioController::class, 'configure'])->name('twilio.configure');
    Route::post('settings/twilio/sync', [TwilioController::class, 'sync'])->name('twilio.sync');
    Route::delete('settings/twilio/remove', [TwilioController::class, 'remove'])->name('twilio.remove');
    Route::post('settings/twilio/configure-phones', [TwilioController::class, 'configurePhones'])->name('twilio.configure-phones');
    Route::post('settings/twilio/test-webhook', [TwilioController::class, 'testWebhook'])->name('twilio.test-webhook');
    Route::get('settings/twilio/health', [TwilioController::class, 'healthCheck'])->name('twilio.health');
    
    // Geo Permissions Management
    Route::get('settings/twilio/geo-permissions', [TwilioController::class, 'getGeoPermissions'])->name('twilio.geo-permissions.get');
    Route::post('settings/twilio/geo-permissions', [TwilioController::class, 'updateGeoPermissions'])->name('twilio.geo-permissions.update');
    Route::post('settings/twilio/geo-permissions/enable-all', [TwilioController::class, 'enableAllCountries'])->name('twilio.geo-permissions.enable-all');
    
    // API Keys Management
    Route::get('settings/api-keys', [ApiKeyController::class, 'index'])->name('api-keys.index');
    Route::post('settings/api-keys', [ApiKeyController::class, 'store'])->name('api-keys.store');
    Route::patch('settings/api-keys/{apiKey}', [ApiKeyController::class, 'update'])->name('api-keys.update');
    Route::delete('settings/api-keys/{apiKey}', [ApiKeyController::class, 'destroy'])->name('api-keys.destroy');
    Route::post('settings/api-keys/{apiKey}/toggle', [ApiKeyController::class, 'toggleStatus'])->name('api-keys.toggle');
});
