import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, blog }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Blog
                </h2>
            }
        >
            <Head title="Blog" />
            <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
                {/* Blog Post Title */}
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    {blog.title}
                </h1>

                {/* Blog Post Metadata */}
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm mb-6">
                    <div>
                        <span>By {blog.user_id}</span> |{" "}
                        <span>{blog.created_at}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-600 dark:bg-blue-500 text-white rounded-full text-xs">
                            {blog?.category && "Info"}
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                {blog?.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-auto rounded-lg mb-6"
                    />
                )}

                {/* Blog Post Content */}
                <div className="prose dark:prose-dark max-w-none">
                    {blog.content}
                </div>

                {/* Tags */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {blog?.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href={route("blogs.index")}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
