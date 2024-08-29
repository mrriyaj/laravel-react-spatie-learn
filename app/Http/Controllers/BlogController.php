<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();

        if ($user->hasPermissionTo('view_all_blogs')) {
            $blogs = Blog::all();
        } elseif ($user->hasPermissionTo('view_own_blogs')) {
            $blogs = Blog::where('user_id', $user->id)->get();
        } else {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Blogs/Index', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
            'blogs' => $blogs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $user = Auth::user();

        if (!$user->hasPermissionTo('create_blogs')) {
            abort(403, 'Unauthorized action.');
        }
        return inertia('Blogs/Create', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = Auth::user();

        if (!$user->hasPermissionTo('create_blogs')) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
        ]);

        $data['user_id'] = $user->id;

        $blog = Blog::create($data);
        $blog->slug = Str::slug("{$blog->id} " . $data['title']);
        $blog->save();

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
        $user = Auth::user();
        if (!$user->hasPermissionTo('view_all_blogs') && !$user->hasPermissionTo('view_own_blogs')) {
            abort(403, 'Unauthorized action.');
        } else if ($user->hasPermissionTo('view_own_blogs') && $blog->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        } else {
            return inertia('Blogs/Show', [
                'auth' => [
                    'user' => $user,
                    'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
                ],
                'blog' => $blog,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
        $user = Auth::user();

        if (!$user->hasPermissionTo('edit_all_blogs') && !$user->hasPermissionTo('edit_own_blogs')) {
            abort(403, 'Unauthorized action.');
        } else if ($user->hasPermissionTo('edit_own_blogs') && $blog->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        } else {
            return inertia('Blogs/Edit', [
                'auth' => [
                    'user' => $user,
                    'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
                ],
                'blog' => $blog,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
        $user = Auth::user();

        if (!$user->hasPermissionTo('edit_all_blogs') && !$user->hasPermissionTo('edit_own_blogs')) {
            abort(403, 'Unauthorized action.');
        } else if ($user->hasPermissionTo('edit_own_blogs') && $blog->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        } else {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'summary' => 'required|string',
                'content' => 'required|string',
            ]);

            $blog->slug = Str::slug("{$blog->id} " . $data['title']);
            $blog->update($data);

            return redirect()->route('blogs.index')->with('success', 'Blog updated successfully.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
        $user = Auth::user();

        if (!$user->hasPermissionTo('delete_all_blogs') && !$user->hasPermissionTo('delete_own_blogs')) {
            abort(403, 'Unauthorized action.');
        } else if ($user->hasPermissionTo('delete_own_blogs') && $blog->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        } else {
            $blog->delete();

            return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully.');
        }
    }
}
