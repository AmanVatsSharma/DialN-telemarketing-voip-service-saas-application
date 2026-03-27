<?php

use Illuminate\Support\Facades\Route;
use App\Models\PhoneNumber;
use App\Models\User;
use App\Services\PhoneNumberService;

Route::get('/test-phone-numbers-debug', function() {
    $allNumbers = PhoneNumber::all(['id', 'number', 'status', 'user_id', 'twilio_sid', 'assigned_at']);
    
    echo "<h1>Phone Numbers Debug</h1>";
    echo "<table border='1' cellpadding='10'>";
    echo "<tr><th>ID</th><th>Number</th><th>Status</th><th>User ID</th><th>Twilio SID</th><th>Assigned At</th></tr>";
    
    foreach ($allNumbers as $number) {
        echo "<tr>";
        echo "<td>{$number->id}</td>";
        echo "<td>{$number->number}</td>";
        echo "<td><strong>{$number->status}</strong></td>";
        echo "<td>" . ($number->user_id ?? 'NULL') . "</td>";
        echo "<td>" . ($number->twilio_sid ? 'YES' : 'NULL') . "</td>";
        echo "<td>" . ($number->assigned_at ?? 'NULL') . "</td>";
        echo "</tr>";
    }
    
    echo "</table>";
    
    echo "<hr><h2>User Numbers Query Test</h2>";
    
    // Test with user ID 1
    $users = User::limit(3)->get();
    foreach ($users as $user) {
        $service = app(PhoneNumberService::class);
        $userNumbers = $service->getUserNumbers($user->id)
            ->whereNotNull('twilio_sid')
            ->get();
        
        echo "<h3>User ID {$user->id} ({$user->name}): {$userNumbers->count()} numbers</h3>";
        echo "<ul>";
        foreach ($userNumbers as $num) {
            echo "<li>{$num->number} (status: {$num->status}, user_id: {$num->user_id})</li>";
        }
        echo "</ul>";
    }
});
