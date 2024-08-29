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

        // Blog Permissions
        $blogPermission = [
            'create_blogs',
            'view_all_blogs',
            'view_own_blogs',
            'edit_all_blogs',
            'edit_own_blogs',
            'delete_all_blogs',
            'delete_own_blogs'
        ];

        // Create blog permissions
        foreach ($blogPermission as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign existing permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo(array_merge([
            'view_own_records',
            'edit_own_records',
        ], $blogPermission));

        // Additional roles if needed
        $managerRole = Role::create(['name' => 'manager']);
        $managerRole->givePermissionTo(array_merge([
            'create_records',
            'view_all_records',
            'edit_all_records',
            'delete_all_records'
        ], $blogPermission));

        $editorRole = Role::create(['name' => 'editor']);
        $editorRole->givePermissionTo(array_merge([
            'view_all_records',
            'edit_own_records',
            'edit_all_records'
        ], $blogPermission));
    }
}
