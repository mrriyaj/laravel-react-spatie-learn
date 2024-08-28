import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

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
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Permissions</label>
                                    <div className="mt-2 grid grid-cols-1 gap-4">
                                        {permissions.map(permission => (
                                            <div key={permission.id}>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        value={permission.name}
                                                        checked={data.permissions.includes(permission.name)}
                                                        onChange={() => togglePermission(permission.name)}
                                                        className="form-checkbox"
                                                    />
                                                    <span className="ml-2">{permission.name}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 btn btn-primary"
                                    disabled={processing}
                                >
                                    Update Role
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
