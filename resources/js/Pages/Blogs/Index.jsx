import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, blogs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div class="flex w-full items-center justify-between">
                    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                        Blogs
                    </h2>
                    <div>
                        <Link
                            href={route("blogs.create")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Blog
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Blogs" />
            <div class="flex flex-wrap justify-center items-start mt-10">
                {blogs.map((blog) => (
                    <div className="p-4 max-w-sm">
                        <div className="flex rounded-lg h-full bg-white dark:bg-gray-800 p-8 flex-col shadow-lg transition-colors duration-300">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <h2 className="text-gray-900 dark:text-gray-100 text-lg font-medium truncate transition-colors duration-300">
                                    {blog.title}
                                </h2>
                            </div>
                            <div className="flex flex-col justify-between flex-grow">
                                <p className="leading-relaxed text-base text-gray-700 dark:text-gray-300 truncate transition-colors duration-300">
                                    {blog.summary}
                                </p>
                                <Link
                                    href={route("blogs.show", blog.id)}
                                    className="mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 inline-flex items-center transition-colors duration-300"
                                >
                                    Read More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
