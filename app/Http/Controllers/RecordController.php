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

        // Determine which records the user can view
        if ($user->hasPermissionTo('view_all_records')) {
            $records = Record::all();
        } elseif ($user->hasPermissionTo('view_own_records')) {
            $records = Record::where('user_id', $user->id)->get();
        } else {
            abort(403, 'Unauthorized action.');
        }

        // Return the records with the user's permissions to the front-end
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

        // Check if the user has permission to create records
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

        // Check if the user has permission to create records
        if (!$user->hasPermissionTo('create_records')) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = $user->id;

        Record::create($data);

        return redirect()->route('records.index')->with('success', 'Record created successfully.');
    }

    public function edit(Record $record)
    {
        $user = Auth::user();

        // Check if the user has permission to edit this record
        if (!$user->hasPermissionTo('edit_all_records') && $record->user_id !== $user->id) {
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

        // Check if the user has permission to update this record
        if (!$user->hasPermissionTo('edit_all_records') && $record->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $record->update($data);

        return redirect()->route('records.index')->with('success', 'Record updated successfully.');
    }

    public function destroy(Record $record)
    {
        $user = Auth::user();

        // Check if the user has permission to delete this record
        if (!$user->hasPermissionTo('delete_all_records') && $record->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $record->delete();

        return redirect()->route('records.index')->with('success', 'Record deleted successfully.');
    }
}
