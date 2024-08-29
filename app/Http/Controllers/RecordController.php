<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecordController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->hasPermissionTo('view_all_records')) {
            $records = Record::all();
        } elseif ($user->hasPermissionTo('view_own_records')) {
            $records = Record::where('user_id', $user->id)->get();
        } else {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Records/Index', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
            'records' => $records,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        if (!$user->hasPermissionTo('create_records')) {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Records/Create', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->hasPermissionTo('create_records')) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = $user->id;

        Record::create($data);

        return redirect()->route('records.index')->with('success', 'Record created successfully.');
    }

    public function show(Record $record)
    {
        $user = Auth::user();

        // Check if the user has permission to view all records,
        // or if they have permission to view their own records and own this record
        if (
            !$user->hasPermissionTo('view_all_records') &&
            !($user->hasPermissionTo('view_own_records') && $record->user_id === $user->id)
        ) {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Records/Show', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
            'record' => $record,
        ]);
    }

    public function edit(Record $record)
    {
        $user = Auth::user();

        // Check if the user has permission to edit all records,
        // or if they have permission to edit their own records and own this record
        if (
            !$user->hasPermissionTo('edit_all_records') &&
            !($user->hasPermissionTo('edit_own_records') && $record->user_id === $user->id)
        ) {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Records/Edit', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            ],
            'record' => $record,
        ]);
    }

    public function update(Request $request, Record $record)
    {
        $user = Auth::user();

        if (!$user->hasPermissionTo('edit_all_records') && (!$user->hasPermissionTo('edit_own_records') || $record->user_id !== $user->id)) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $record->update($data);

        return redirect()->route('records.index')->with('success', 'Record updated successfully.');
    }

    public function destroy(Record $record)
    {
        $user = Auth::user();

        if (!$user->hasPermissionTo('delete_all_records') && (!$user->hasPermissionTo('delete_own_records') || $record->user_id !== $user->id)) {
            abort(403, 'Unauthorized action.');
        }

        $record->delete();

        return redirect()->route('records.index')->with('success', 'Record deleted successfully.');
    }
}
