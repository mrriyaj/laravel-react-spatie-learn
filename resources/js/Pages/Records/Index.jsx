import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, records }) {
    const permissions = auth.permissions || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Records</h2>}
        >
            <Head title="Records" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                {permissions.includes('create_records') && (
                                    <Link
                                        href={route('records.create')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create New Record
                                    </Link>
                                )}
                            </div>

                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Record Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {records.map(record => (
                                                    <tr key={record.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {record.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            {(permissions.includes('edit_all_records') || record.user_id === auth.user.id) && (
                                                                <Link
                                                                    href={route('records.edit', record.id)}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            )}
                                                            {(permissions.includes('delete_all_records') || record.user_id === auth.user.id) && (
                                                                <Link
                                                                    href={route('records.destroy', record.id)}
                                                                    as="button"
                                                                    method="delete"
                                                                    className="text-red-600 hover:text-red-900 ml-4"
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
                                </div>
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
