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
            <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-8 transition-colors duration-300">
                {/* Blog Post Title */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                    {blog.title}
                </h1>

                {/* Blog Post Metadata */}
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm mb-6">
                    <div>
                        <span className="text-gray-700 dark:text-gray-300">
                            By {blog.user_id}
                        </span>
                        <span className="mx-2 text-gray-500">|</span>
                        <span className="text-gray-700 dark:text-gray-300">
                            {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {blog?.category && (
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium transition-colors duration-300">
                                {blog.category}
                            </span>
                        )}
                    </div>
                </div>

                {/* Featured Image */}
                {blog?.image && (
                    <div className="overflow-hidden rounded-lg mb-6">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-auto rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>
                )}

                {/* Blog Post Content */}
                <div className="prose dark:prose-invert max-w-none transition-colors duration-300">
                    {blog.content}
                </div>

                {/* Tags */}
                {blog?.tags?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium transition-colors duration-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href={route("blogs.index")}
                        className="inline-block px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
