# 📌 Laravel React Spatie Permissions Project

🚀 **A full-stack web application integrating Laravel, React, and Spatie Permissions for robust role-based access control (RBAC).**  
Manage users, roles, and permissions efficiently while leveraging Inertia.js for seamless single-page application (SPA) experiences.

---

## **✨ Features**
✅ **Role-Based Access Control (RBAC)** - Manage user roles and permissions with Spatie's Laravel Permissions package.  
✅ **CRUD Operations** - Create, view, update, and delete records with fine-grained permission checks.  
✅ **Inertia.js Integration** - Seamless integration of Laravel with React for modern SPAs.  
✅ **Responsive Design** - Styled with Tailwind CSS for a clean and responsive UI.  

---

## **📥 Prerequisites**
Before setting up the project, ensure you have the following installed:
- PHP 8.0 or higher  
- Composer  
- Node.js and npm  
- MySQL or any other supported database  

---

## **📥 Installation**
1. Clone the Repository:
   ```sh
   git clone https://github.com/mrriyaj/laravel-react_spatie.git
   cd laravel-react_spatie
   ```
2. Install Dependencies:
   **Backend (Laravel)**
   ```sh
   composer install
   ```
   **Frontend (React)**
   ```sh
   npm install
   ```
3. Set Up Environment Variables:
   ```sh
   cp .env.example .env
   ```
4. Generate Application Key:
   ```sh
   php artisan key:generate
   ```
5. Run Migrations and Seeders:
   ```sh
   php artisan migrate --seed
   ```
6. Build Frontend Assets:
   ```sh
   npm run dev
   ```
   For production:
   ```sh
   npm run build
   ```
7. Serve the Application:
   ```sh
   php artisan serve
   ```

---

## **📌 Usage**
### **Roles and Permissions**
This project includes the following predefined roles and permissions:
- **Admin**: Full access to all records and administrative tasks.  
- **User**: Limited access, typically can only view and manage their own records.  

### **Managing Records**
Users can perform CRUD operations on records based on their permissions:
- **Create**: Users with the `create_records` permission can create new records.
- **View**: Users with the `view_all_records` permission can view all records, while those with `view_own_records` can only view records they created.
- **Edit**: Users with the `edit_all_records` permission can edit any record, while those with `edit_own_records` can only edit their own records.
- **Delete**: Users with the `delete_all_records` permission can delete any record, while those with `delete_own_records` can only delete their own records.

### **Customizing Permissions**
To add or modify permissions, update the `RolesAndPermissionsSeeder` and re-run the seeders:
   ```sh
   php artisan db:seed --class=RolesAndPermissionsSeeder
   ```

---

## **📂 Project Structure**
- `app/Http/Controllers`: Contains the application’s controllers, including `RecordController` for managing records.  
- `resources/js/Pages`: Contains the React components for the various pages like Index, Create, and Edit.  
- `routes/web.php`: Defines the routes for the application.  
- `database/migrations`: Contains migration files for creating database tables.  
- `database/seeders`: Contains seeders for populating the database with roles, permissions, and sample data.  

---

## **🛠️ Testing**
To run the tests, use the following command:
   ```sh
   php artisan test
   ```
Ensure that you have set up a testing database and configured the `.env.testing` file accordingly.

---

## **🤝 Contributing**
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Issues and feature requests are also welcome.

---

## **📜 License**
This project is open-source and licensed under the **MIT License**.

---

## **💡 Support & Feedback**
If you have any issues or feature requests, please **open an issue** on GitHub.  
⭐ Don't forget to **star** the repository if you find it useful! 🚀

