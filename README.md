Laravel-React Spatie Permissions Project
# Laravel React Spatie

This project is a full-stack web application built using Laravel, React, and Inertia.js. It utilizes Spatie's Laravel Permissions package to manage role-based access control (RBAC). The project includes CRUD operations for records, where users can create, edit, view, and delete records based on their assigned roles and permissions.

## Features

- Role-Based Access Control (RBAC): Manage user roles and permissions with Spatie's Laravel Permissions package.
- CRUD Operations: Create, view, update, and delete records with fine-grained permission checks.
- Inertia.js Integration: Seamless integration of Laravel with React for building modern single-page applications (SPAs).
- Responsive Design: The frontend is styled with Tailwind CSS, ensuring a responsive and clean UI.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- PHP 8.0 or higher
- Composer
- Node.js and npm
- MySQL or any other supported database

## Installation

1. Clone the Repository

```bash
git clone https://github.com/yourusername/laravel-react_spatie.git
cd laravel-react_spatie
```

2. Install Dependencies

Backend (Laravel)

```bash
composer install
```

Frontend (React)

```bash
npm install
```

3. Set Up Environment Variables

Copy the `.env.example` file to `.env` and configure your database and other environment settings.

```bash
cp .env.example .env
```

4. Generate Application Key

```bash
php artisan key:generate
```

5. Run Migrations and Seeders

Run the migrations to create the database tables and seed the database with roles, permissions, and an initial admin user.

```bash
php artisan migrate --seed
```

6. Build Frontend Assets

Compile the frontend assets using Laravel Mix.

```bash
npm run dev
```

For production:

```bash
npm run build
```

7. Serve the Application

Start the Laravel development server:

```bash
php artisan serve
```

## Usage

### Roles and Permissions

This project includes the following predefined roles and permissions:

- Admin: Full access to all records and administrative tasks.
- User: Limited access, typically can only view and manage their own records.

### Managing Records

Users can perform CRUD operations on records based on their permissions:

- Create: Users with the `create_records` permission can create new records.
- View: Users with the `view_all_records` permission can view all records, while those with the `view_own_records` permission can only view records they created.
- Edit: Users with the `edit_all_records` permission can edit any record, while those with the `edit_own_records` permission can only edit their own records.
- Delete: Users with the `delete_all_records` permission can delete any record, while those with the `delete_own_records` permission can only delete their own records.

### Customizing Permissions

To add or modify permissions, update the `RolesAndPermissionsSeeder` and re-run the seeders:

```bash
php artisan db:seed --class=RolesAndPermissionsSeeder
```

## Project Structure

- `app/Http/Controllers`: Contains the application’s controllers, including `RecordController` for managing records.
- `resources/js/Pages`: Contains the React components for the various pages like Index, Create, and Edit.
- `routes/web.php`: Defines the routes for the application.
- `database/migrations`: Contains migration files for creating database tables.
- `database/seeders`: Contains seeders for populating the database with roles, permissions, and sample data.

## Testing

To run the tests, use the following command:

```bash
php artisan test
```

Ensure that you have set up a testing database and configured the `.env.testing` file accordingly.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Issues and feature requests are also welcome.

## License

This project is open-source and licensed under the MIT License.

