<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', User::class);

        $query = User::query()
            ->whereHas('roles', fn($q) => $q->where('slug', Role::AGENT))
            ->with(['roles', 'parent']);

        // Customers see only their agents
        if ($request->user()->isCustomer()) {
            $query->where('parent_user_id', $request->user()->id);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $agents = $query->paginate($request->get('per_page', 15))
            ->withQueryString();

        return Inertia::render('agents/index', [
            'agents' => $agents,
            'filters' => $request->only(['search', 'status', 'sort_field', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', User::class);

        return Inertia::render('agents/create', [
            'permissions' => Permission::groupedByModule()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'permissions' => ['array'],
            'permissions.*' => ['exists:permissions,id'],
        ]);

        // Create agent
        $agent = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => 'active',
            'parent_user_id' => $request->user()->id,
        ]);

        // Assign agent role
        $agentRole = Role::where('slug', Role::AGENT)->firstOrFail();
        $agent->assignRole($agentRole->slug);

        // Assign custom permissions if provided
        if (!empty($validated['permissions'])) {
            $this->assignPermissionsToAgent($agent, $validated['permissions'], $request->user());
        }

        return redirect()->route('agents.index')
            ->with('success', 'Agent created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $agent): Response
    {
        $this->authorize('view', $agent);

        // Ensure it's an agent
        abort_unless($agent->isAgent(), 404);

        $agent->load(['roles.permissions', 'parent']);

        // Get agent's activity stats
        $stats = [
            'campaigns_executed' => $agent->calls()->distinct('campaign_id')->count('campaign_id'),
            'calls_made' => $agent->calls()->count(),
            'total_call_duration' => $agent->calls()->sum('duration'),
            'contacts_reached' => $agent->calls()->whereIn('status', ['completed', 'answered'])->count(),
        ];

        // Get recent activity
        $recentCalls = $agent->calls()
            ->with(['campaign', 'contact'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('agents/show', [
            'agent' => $agent,
            'stats' => $stats,
            'recentCalls' => $recentCalls,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $agent): Response
    {
        $this->authorize('update', $agent);

        // Ensure it's an agent
        abort_unless($agent->isAgent(), 404);

        $agent->load('roles.permissions');

        return Inertia::render('agents/edit', [
            'agent' => $agent,
            'permissions' => Permission::groupedByModule()->get(),
            'agentPermissions' => $agent->permissions()->pluck('id')->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $agent)
    {
        $this->authorize('update', $agent);

        // Ensure it's an agent
        abort_unless($agent->isAgent(), 404);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($agent->id)],
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'status' => ['required', Rule::in(['active', 'inactive', 'suspended'])],
            'permissions' => ['array'],
            'permissions.*' => ['exists:permissions,id'],
        ]);

        // Update basic info
        $agent->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'status' => $validated['status'],
        ]);

        // Update password if provided
        if (!empty($validated['password'])) {
            $agent->update(['password' => Hash::make($validated['password'])]);
        }

        // Update permissions if authorized
        if (isset($validated['permissions']) && $request->user()->can('assignPermissions', $agent)) {
            $this->assignPermissionsToAgent($agent, $validated['permissions'], $request->user());
        }

        return redirect()->route('agents.index')
            ->with('success', 'Agent updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $agent)
    {
        $this->authorize('delete', $agent);

        // Ensure it's an agent
        abort_unless($agent->isAgent(), 404);

        $agent->delete();

        return redirect()->route('agents.index')
            ->with('success', 'Agent deleted successfully.');
    }

    /**
     * Assign permissions to agent with validation.
     */
    private function assignPermissionsToAgent(User $agent, array $permissionIds, User $assignedBy): void
    {
        // For now, permissions are managed through roles only
        // Ensure the agent has the agent role
        $agentRole = Role::where('slug', Role::AGENT)->first();
        
        if (!$agent->roles->contains('id', $agentRole->id)) {
            $agent->roles()->attach($agentRole->id, [
                'created_by_user_id' => $assignedBy->id,
            ]);
        }
        
        // Note: Custom per-user permissions can be added later by creating
        // a direct user_permissions table if needed
    }

    /**
     * Toggle agent status.
     */
    public function toggleStatus(User $agent)
    {
        $this->authorize('update', $agent);

        // Ensure it's an agent
        abort_unless($agent->isAgent(), 404);

        $agent->update([
            'status' => $agent->status === 'active' ? 'inactive' : 'active',
        ]);

        return back()->with('success', 'Agent status updated successfully.');
    }
}
