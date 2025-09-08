<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Call;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CallPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('calls.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Call $call): bool
    {
        // Admin and users with view_all permission can view all calls
        if ($user->isAdmin() || $user->hasPermission('calls.view_all')) {
            return true;
        }

        // Customers can view their own calls and their agents' calls
        if ($user->isCustomer()) {
            if ($call->user_id === $user->id) {
                return true;
            }
            
            // Check if call belongs to one of their agents
            $agentIds = $user->agents()->pluck('id')->toArray();
            if (in_array($call->user_id, $agentIds)) {
                return true;
            }
        }

        // Agents can view their parent customer's calls
        if ($user->hasRole('agent')) {
            // Agent can view calls that belong to their parent customer
            if ($call->user_id === $user->parent_user_id) {
                return true;
            }
            // Agent can also view their own calls
            if ($call->user_id === $user->id) {
                return true;
            }
        }

        // Users with view_own permission can only view their own calls
        if ($user->hasPermission('calls.view_own') && $call->user_id === $user->id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can make calls.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('calls.make');
    }

    /**
     * Determine whether the user can listen to recordings.
     */
    public function listenRecording(User $user, Call $call): bool
    {
        // Check base permission
        if (!$user->hasPermission('calls.recordings')) {
            return false;
        }

        // Admin can listen to all
        if ($user->isAdmin()) {
            return true;
        }

        // Must be able to view the call first
        return $this->view($user, $call);
    }

    /**
     * Determine whether the user can download recordings.
     */
    public function downloadRecording(User $user, Call $call): bool
    {
        // Check base permission
        if (!$user->hasPermission('calls.download')) {
            return false;
        }

        // Admin can download all
        if ($user->isAdmin()) {
            return true;
        }

        // Must be able to view the call first
        return $this->view($user, $call);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Call $call): bool
    {
        // Only admins can update calls (for administrative purposes)
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Call $call): bool
    {
        // Only admins can delete calls
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Call $call): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Call $call): bool
    {
        return $user->isAdmin();
    }
}

