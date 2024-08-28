<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Fetch roles by name and verify they exist
        $adminRole = Role::where('name', 'admin')->first();
        if (!$adminRole) {
            throw new \Exception('Admin role not found. Make sure RolesAndPermissionsSeeder has been run.');
        }

        $userRole = Role::where('name', 'user')->first();
        if (!$userRole) {
            throw new \Exception('User role not found. Make sure RolesAndPermissionsSeeder has been run.');
        }

        // Create an admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Ensure to hash the password
            'role_id' => $adminRole->id,
        ])->assignRole($adminRole->name);

        // Create a regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ])->assignRole($userRole->name);

        // Create more users as needed
        // ...
    }
}
