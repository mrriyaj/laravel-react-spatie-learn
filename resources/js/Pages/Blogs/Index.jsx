import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { can } from "@/Lib/utils";

export default function Index({ auth, blogs }) {
    const user = auth.user;

    const handleDelete = (blogId) => {
        if (confirm("Are you sure you want to delete this blog?")) {
            router.delete(route("blogs.destroy", blogId), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("Blog deleted successfully.");
                },
                onError: () => {
                    alert("Error deleting blog.");
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Blogs
                </h2>
            }
        >
            <Head title="Blogs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-4 flex justify-between">
                                {can(auth, "create_blogs") && (
                                    <Link
                                        href={route("blogs.create")}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create New Blog
                                    </Link>
                                )}
                                <span className="text-gray-500">
                                    Total Blogs: {blogs.length}
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
                                                Summary
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
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
                                        {blogs.map((blog) => (
                                            <tr key={blog.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {blog.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {blog.summary}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {blog.status}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {blog.user_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route(
                                                            "blogs.show",
                                                            blog.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Read
                                                    </Link>
                                                    {(can("edit_all_blogs") ||
                                                        (auth.permissions.includes(
                                                            "edit_own_blogs"
                                                        ) &&
                                                            user.id ===
                                                                blog.user_id)) && (
                                                        <Link
                                                            href={route(
                                                                "blogs.edit",
                                                                blog.id
                                                            )}
                                                            className="ml-4 text-yellow-600 hover:text-yellow-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                    {(can("delete_all_blogs") ||
                                                        (auth.permissions.includes(
                                                            "delete_own_blogs"
                                                        ) &&
                                                            user.id ===
                                                                blog.user_id)) && (
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    blog.id
                                                                )
                                                            }
                                                            className="ml-4 text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {blogs.length === 0 && (
                                <div className="text-center text-gray-500 mt-4">
                                    No blogs found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
