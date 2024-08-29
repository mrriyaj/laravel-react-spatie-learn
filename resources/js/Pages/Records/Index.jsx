import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, records }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Records</h2>}
        >
            <Head title="Records" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-4 flex justify-between">
                                {auth.permissions.includes('create_records') && (
                                    <Link
                                        href={route('records.create')}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create New Record
                                    </Link>
                                )}
                                <span className="text-gray-500">
                                    Total Records: {records.length}
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created By (User ID)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {records.map((record) => (
                                            <tr key={record.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {record.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.user_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route('records.show', record.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Read
                                                    </Link>
                                                    {(auth.permissions.includes('edit_all_records') || (auth.permissions.includes('edit_own_records') && record.user_id === auth.user.id)) && (
                                                        <Link
                                                            href={route('records.edit', record.id)}
                                                            className="ml-4 text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                    {(auth.permissions.includes('delete_all_records') || (auth.permissions.includes('delete_own_records') && record.user_id === auth.user.id)) && (
                                                        <Link
                                                            href={route('records.destroy', record.id)}
                                                            as="button"
                                                            method="delete"
                                                            className="ml-4 text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {records.length === 0 && (
                                <div className="text-center text-gray-500 mt-4">
                                    No records found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
