import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, record }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Record Details
                </h2>
            }
        >
            <Head title={record.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                {record.title}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {record.description || "No description provided."}
                            </p>
                            <div className="text-gray-500 mb-4">
                                <p>
                                    <strong>Created By:</strong> User ID {record.user_id}
                                </p>
                                <p>
                                    <strong>Created At:</strong> {new Date(record.created_at).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Last Updated:</strong> {new Date(record.updated_at).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                {auth.permissions.includes('edit_all_records') ||
                                    (auth.permissions.includes('edit_own_records') && record.user_id === auth.user.id) ? (
                                    <Link
                                        href={route("records.edit", record.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                ) : null}

                                {auth.permissions.includes('delete_all_records') ||
                                    (auth.permissions.includes('delete_own_records') && record.user_id === auth.user.id) ? (
                                    <button
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    "Are you sure you want to delete this record?"
                                                )
                                            ) {
                                                router.delete(
                                                    route("records.destroy", record.id),
                                                    {
                                                        preserveScroll: true,
                                                        onSuccess: () => {
                                                            alert("Record deleted successfully.");
                                                        },
                                                        onError: () => {
                                                            alert("Error deleting record.");
                                                        },
                                                    }
                                                );
                                            }
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
