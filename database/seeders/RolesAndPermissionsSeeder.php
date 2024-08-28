<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::create(['name' => 'create_records']);
        Permission::create(['name' => 'view_all_records']);
        Permission::create(['name' => 'view_own_records']);
        Permission::create(['name' => 'edit_all_records']);
        Permission::create(['name' => 'edit_own_records']);
        Permission::create(['name' => 'delete_all_records']);
        Permission::create(['name' => 'delete_own_records']);

        // Create roles and assign existing permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo([
            'view_own_records',
            'edit_own_records'
        ]);

        // Additional roles if needed
        $managerRole = Role::create(['name' => 'manager']);
        $managerRole->givePermissionTo([
            'create_records',
            'view_all_records',
            'edit_all_records',
            'delete_all_records'
        ]);

        $editorRole = Role::create(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view_all_records',
            'edit_own_records',
            'edit_all_records'
        ]);
    }
}
