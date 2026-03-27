<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class RolePermissionTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles and permissions
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
        $this->artisan('db:seed', ['--class' => 'PermissionSeeder']);
    }

    /** @test */
    public function it_creates_three_roles_with_correct_hierarchy()
    {
        $this->assertEquals(3, Role::count());

        $admin = Role::where('slug', 'admin')->first();
        $customer = Role::where('slug', 'customer')->first();
        $agent = Role::where('slug', 'agent')->first();

        $this->assertNotNull($admin);
        $this->assertNotNull($customer);
        $this->assertNotNull($agent);

        $this->assertEquals(1, $admin->level);
        $this->assertEquals(2, $customer->level);
        $this->assertEquals(3, $agent->level);
    }

    /** @test */
    public function it_creates_forty_permissions()
    {
        $this->assertEquals(40, Permission::count());

        // Check campaigns module permissions
        $this->assertDatabaseHas('permissions', ['slug' => 'campaigns.view']);
        $this->assertDatabaseHas('permissions', ['slug' => 'campaigns.create']);
        $this->assertDatabaseHas('permissions', ['slug' => 'campaigns.update']);
        $this->assertDatabaseHas('permissions', ['slug' => 'campaigns.delete']);

        // Check users module permissions
        $this->assertDatabaseHas('permissions', ['slug' => 'users.view']);
        $this->assertDatabaseHas('permissions', ['slug' => 'users.create']);
        
        // Check agents module permissions
        $this->assertDatabaseHas('permissions', ['slug' => 'agents.view']);
        $this->assertDatabaseHas('permissions', ['slug' => 'agents.create']);
    }

    /** @test */
    public function admin_role_has_all_permissions()
    {
        $admin = Role::where('slug', 'admin')->first();
        
        $this->assertEquals(40, $admin->permissions()->count());
    }

    /** @test */
    public function customer_role_has_correct_permissions()
    {
        $customer = Role::where('slug', 'customer')->first();
        
        // Customer should have 26 permissions
        $this->assertEquals(26, $customer->permissions()->count());
        
        // Customer should have campaign permissions
        $this->assertTrue($customer->permissions->contains('slug', 'campaigns.view'));
        $this->assertTrue($customer->permissions->contains('slug', 'campaigns.create'));
        
        // Customer should NOT have user management permissions
        $this->assertFalse($customer->permissions->contains('slug', 'users.view'));
        $this->assertFalse($customer->permissions->contains('slug', 'users.create'));
        
        // Customer should have agent management permissions
        $this->assertTrue($customer->permissions->contains('slug', 'agents.view'));
        $this->assertTrue($customer->permissions->contains('slug', 'agents.create'));
    }

    /** @test */
    public function agent_role_has_correct_permissions()
    {
        $agent = Role::where('slug', 'agent')->first();
        
        // Agent should have 9 permissions
        $this->assertEquals(9, $agent->permissions()->count());
        
        // Agent should have view permissions
        $this->assertTrue($agent->permissions->contains('slug', 'campaigns.view'));
        $this->assertTrue($agent->permissions->contains('slug', 'contacts.view'));
        $this->assertTrue($agent->permissions->contains('slug', 'calls.view'));
        
        // Agent should be able to make calls
        $this->assertTrue($agent->permissions->contains('slug', 'calls.make'));
        
        // Agent should NOT have create/update/delete permissions
        $this->assertFalse($agent->permissions->contains('slug', 'campaigns.create'));
        $this->assertFalse($agent->permissions->contains('slug', 'campaigns.update'));
        $this->assertFalse($agent->permissions->contains('slug', 'contacts.create'));
    }

    /** @test */
    public function user_can_be_assigned_a_role()
    {
        $user = User::factory()->create();
        $role = Role::where('slug', 'customer')->first();

        $user->assignRole($role->slug);

        $this->assertTrue($user->hasRole('customer'));
        $this->assertFalse($user->hasRole('admin'));
    }

    /** @test */
    public function user_can_be_assigned_multiple_roles()
    {
        $user = User::factory()->create();
        $customer = Role::where('slug', 'customer')->first();
        $agent = Role::where('slug', 'agent')->first();

        $user->assignRole(['customer', 'agent']);

        $this->assertTrue($user->hasRole('customer'));
        $this->assertTrue($user->hasRole('agent'));
        $this->assertEquals(2, $user->roles()->count());
    }

    /** @test */
    public function user_can_be_removed_from_role()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $this->assertTrue($user->hasRole('customer'));

        $user->removeRole('customer');

        $this->assertFalse($user->hasRole('customer'));
    }

    /** @test */
    public function user_inherits_permissions_from_role()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $this->assertTrue($user->hasPermission('campaigns.view'));
        $this->assertTrue($user->hasPermission('campaigns.create'));
        $this->assertFalse($user->hasPermission('users.view'));
    }

    /** @test */
    public function user_can_have_direct_permissions()
    {
        $user = User::factory()->create();
        $user->assignRole('agent'); // Agent doesn't have campaigns.create
        
        $this->assertFalse($user->hasPermission('campaigns.create'));

        // Assign direct permission
        $user->assignPermission('campaigns.create');

        $this->assertTrue($user->hasPermission('campaigns.create'));
    }

    /** @test */
    public function user_get_all_permissions_merges_role_and_direct_permissions()
    {
        $user = User::factory()->create();
        $user->assignRole('agent'); // 9 permissions
        
        // Assign 2 additional direct permissions
        $user->assignPermission(['campaigns.create', 'contacts.create']);

        $allPermissions = $user->getAllPermissions();
        
        // Should have 11 unique permissions (9 from role + 2 direct)
        $this->assertEquals(11, $allPermissions->count());
    }

    /** @test */
    public function user_can_have_parent_user()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create([
            'parent_user_id' => $customer->id
        ]);
        $agent->assignRole('agent');

        $this->assertEquals($customer->id, $agent->parent_user_id);
        $this->assertInstanceOf(User::class, $agent->parent);
        $this->assertEquals($customer->id, $agent->parent->id);
    }

    /** @test */
    public function customer_can_have_multiple_agents()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent1 = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent1->assignRole('agent');

        $agent2 = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent2->assignRole('agent');

        $this->assertEquals(2, $customer->agents()->count());
    }

    /** @test */
    public function user_status_defaults_to_active()
    {
        $user = User::factory()->create();
        
        $this->assertEquals('active', $user->status);
    }

    /** @test */
    public function user_status_can_be_changed()
    {
        $user = User::factory()->create(['status' => 'active']);
        
        $user->status = 'inactive';
        $user->save();

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'status' => 'inactive'
        ]);
    }

    /** @test */
    public function permission_user_table_allows_direct_assignments()
    {
        $user = User::factory()->create();
        $permission = Permission::where('slug', 'campaigns.create')->first();
        $assignedBy = User::factory()->create();

        $user->permissions()->attach($permission->id, [
            'assigned_by_user_id' => $assignedBy->id
        ]);

        $this->assertDatabaseHas('permission_user', [
            'user_id' => $user->id,
            'permission_id' => $permission->id,
            'assigned_by_user_id' => $assignedBy->id
        ]);
    }

    /** @test */
    public function deleting_user_removes_role_assignments()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $userId = $user->id;

        $this->assertDatabaseHas('role_user', ['user_id' => $userId]);

        $user->delete();

        $this->assertDatabaseMissing('role_user', ['user_id' => $userId]);
    }

    /** @test */
    public function deleting_role_removes_assignments()
    {
        $role = Role::factory()->create([
            'name' => 'Test Role',
            'slug' => 'test-role',
            'level' => 99
        ]);

        $user = User::factory()->create();
        $user->roles()->attach($role->id);

        $roleId = $role->id;

        $this->assertDatabaseHas('role_user', ['role_id' => $roleId]);

        $role->delete();

        $this->assertDatabaseMissing('role_user', ['role_id' => $roleId]);
    }

    /** @test */
    public function has_any_role_returns_true_if_user_has_one_of_roles()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $this->assertTrue($user->hasAnyRole(['admin', 'customer', 'agent']));
        $this->assertTrue($user->hasAnyRole(['customer', 'agent']));
        $this->assertFalse($user->hasAnyRole(['admin', 'agent']));
    }

    /** @test */
    public function has_all_roles_returns_true_only_if_user_has_all_roles()
    {
        $user = User::factory()->create();
        $user->assignRole(['customer', 'agent']);

        $this->assertTrue($user->hasAllRoles(['customer', 'agent']));
        $this->assertFalse($user->hasAllRoles(['admin', 'customer', 'agent']));
    }

    /** @test */
    public function has_any_permission_returns_true_if_user_has_one_of_permissions()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $this->assertTrue($user->hasAnyPermission(['campaigns.view', 'users.view']));
        $this->assertFalse($user->hasAnyPermission(['users.view', 'users.create']));
    }

    /** @test */
    public function has_all_permissions_returns_true_only_if_user_has_all_permissions()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $this->assertTrue($user->hasAllPermissions(['campaigns.view', 'campaigns.create']));
        $this->assertFalse($user->hasAllPermissions(['campaigns.view', 'users.view']));
    }
}
