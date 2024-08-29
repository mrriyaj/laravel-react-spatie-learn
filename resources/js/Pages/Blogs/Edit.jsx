import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, blog }) {
    const { data, setData, put, processing, errors } = useForm({
        title: blog?.title ?? "",
        content: blog?.content ?? "",
        summary: blog?.summary ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("blogs.update", blog.id));
    };

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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Title Field */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                                    />
                                    {errors.title && (
                                        <div className="text-red-600 mt-2 text-sm">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>

                                {/* Summary Field */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="summary"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Summary
                                    </label>
                                    <textarea
                                        id="summary"
                                        value={data.summary}
                                        onChange={(e) =>
                                            setData("summary", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                                    ></textarea>
                                    {errors.summary && (
                                        <div className="text-red-600 mt-2 text-sm">
                                            {errors.summary}
                                        </div>
                                    )}
                                </div>

                                {/* Content Field */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                                    ></textarea>
                                    {errors.content && (
                                        <div className="text-red-600 mt-2 text-sm">
                                            {errors.content}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        disabled={processing}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
