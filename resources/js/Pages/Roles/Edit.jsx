import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, role, permissions, rolePermissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: rolePermissions,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    const togglePermission = (permission) => {
        setData('permissions', data.permissions.includes(permission)
            ? data.permissions.filter((p) => p !== permission)
            : [...data.permissions, permission]
        );
    };

    const toggleAllCategoryPermissions = (categoryPermissions, isSelected) => {
        if (isSelected) {
            setData('permissions', data.permissions.filter(p => !categoryPermissions.includes(p)));
        } else {
            setData('permissions', [...data.permissions, ...categoryPermissions.filter(p => !data.permissions.includes(p))]);
        }
    };

    const categorizedPermissions = {
        Records: [
            'create_records', 'view_all_records', 'view_own_records',
            'edit_all_records', 'edit_own_records',
            'delete_all_records', 'delete_own_records'
        ],
        Blogs: [
            'create_blogs', 'view_all_blogs', 'view_own_blogs',
            'edit_all_blogs', 'edit_own_blogs',
            'delete_all_blogs', 'delete_own_blogs'
        ]
    };

    const permissionTypes = ['create', 'view_all', 'view_own', 'edit_all', 'edit_own', 'delete_all', 'delete_own'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Role</h2>}
        >
            <Head title="Edit Role" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className="mt-1 block w-full"
                                    />
                                    {errors.name && <span className="text-red-600">{errors.name}</span>}
                                </div>

                                <div className="mt-6">
                                    <table className="min-w-full table-auto border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border border-gray-300 text-left">Permission Category</th>
                                                {permissionTypes.map(type => (
                                                    <th key={type} className="px-4 py-2 border border-gray-300 text-center capitalize">
                                                        {type.replace('_', ' ')}
                                                    </th>
                                                ))}
                                                <th className="px-4 py-2 border border-gray-300 text-center">Select All</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(categorizedPermissions).map(category => {
                                                const categoryPermissions = categorizedPermissions[category];
                                                const allSelected = categoryPermissions.every(permission => data.permissions.includes(permission));

                                                return (
                                                    <tr key={category}>
                                                        <td className="px-4 py-2 border border-gray-300 font-medium">{category}</td>
                                                        {permissionTypes.map(type => {
                                                            const permissionKey = `${type}_${category.toLowerCase()}`;
                                                            const permission = categoryPermissions.find(p => p.startsWith(type));

                                                            return (
                                                                <td key={type} className="px-4 py-2 border border-gray-300 text-center">
                                                                    {permission && (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={data.permissions.includes(permission)}
                                                                            onChange={() => togglePermission(permission)}
                                                                            className="form-checkbox h-4 w-4 text-blue-600"
                                                                        />
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                        <td className="px-4 py-2 border border-gray-300 text-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={allSelected}
                                                                onChange={() => toggleAllCategoryPermissions(categoryPermissions, allSelected)}
                                                                className="form-checkbox h-4 w-4 text-blue-600"
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        disabled={processing}
                                    >
                                        Update Role
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
