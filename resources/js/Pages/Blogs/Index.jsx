import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { can } from "@/Lib/utils";
import { Button } from "@headlessui/react";

export default function Index({ auth, blogs }) {
    const user = auth.user;

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
                    <div className="p-4 max-w-md">
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
                                <div className="mt-4 flex items-center space-x-4">
                                    <Link
                                        href={route("blogs.show", blog.id)}
                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 inline-flex items-center transition-colors duration-300"
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
                                    {can(auth, "edit_own_blogs") &&
                                        user.id === blog.user_id && (
                                            <Link
                                                href={route(
                                                    "blogs.edit",
                                                    blog.id
                                                )}
                                                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 inline-flex items-center transition-colors duration-300"
                                            >
                                                Edit
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="w-4 h-4 ml-2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 20h9M5.5 20h-1M7 20l-3-3V7l4-4h10l4 4v10l-3 3H7zm5-3v-8M5 8h14"></path>
                                                </svg>
                                            </Link>
                                        )}
                                    {can(auth, "delete_own_blogs") &&
                                        user.id === blog.user_id && (
                                            <Button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Are you sure you want to delete this blog?"
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                "blogs.destroy",
                                                                blog.id
                                                            ),
                                                            {
                                                                preserveScroll: true,
                                                                onSuccess:
                                                                    () => {
                                                                        console.log(
                                                                            "deleted"
                                                                        );
                                                                    },
                                                                onError: () => {
                                                                    console.log(
                                                                        "error"
                                                                    );
                                                                },
                                                            }
                                                        );
                                                    }
                                                }}
                                                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 inline-flex items-center transition-colors duration-300"
                                            >
                                                Delete
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="w-4 h-4 ml-2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 20h9M5.5 20h-1M7 20l-3-3V7l4-4h10l4 4v10l-3 3H7zm5-3v-8M5 8h14"></path>
                                                </svg>
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
