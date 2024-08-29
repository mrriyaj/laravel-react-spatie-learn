import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, roles }) {
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

    const renderPermissions = (role) => {
        return Object.keys(categorizedPermissions).map((category, index) => (
            <tr key={category}>
                {index === 0 && (
                    <>
                    <td
                        rowSpan={Object.keys(categorizedPermissions).length}
                        className="px-6 py-4 whitespace-nowrap text-center align-top"
                    >
                        <div className="text-sm font-medium text-gray-900 mb-2">
                            {role.name}
                        </div>
                    </td>
                    <td
                        rowSpan={Object.keys(categorizedPermissions).length}
                        className="px-6 py-4 whitespace-nowrap text-center align-top"
                    >
                        <div className="flex flex-col items-start space-y-2">
                            <Link
                                href={route('roles.edit', role.id)}
                                className="text-indigo-600 hover:text-indigo-900 text-xs"
                            >
                                Edit
                            </Link>
                            <Link
                                href="#"
                                className="text-red-600 hover:text-red-900 text-xs"
                            >
                                Delete
                            </Link>
                        </div>
                        </td>
                    </>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                        {category}
                    </div>
                </td>
                {permissionTypes.map(type => (
                    <td key={type} className="px-6 py-4 whitespace-nowrap text-center">
                        {role.permissions.some(permission => permission.name === `${type}_${category.toLowerCase()}`) ? (
                            <span className="text-green-600">✓</span>
                        ) : (
                            <span className="text-red-600">✗</span>
                        )}
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Roles Management</h2>}
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Roles List</h3>
                                <Link
                                    href={route('roles.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Create New Role
                                </Link>
                            </div>

                            <div className="flex flex-col">
                                <div className="inline-block min-w-full py-2 align-middle">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Role Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Category
                                                    </th>
                                                    {permissionTypes.map((type) => (
                                                        <th
                                                            key={type}
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            {type.replace('_', ' ')}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {roles.map((role) => (
                                                    <React.Fragment key={role.id}>
                                                        {renderPermissions(role)}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {roles.length === 0 && (
                                <div className="text-center text-gray-500 mt-4">
                                    No roles found. Start by creating a new role.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
