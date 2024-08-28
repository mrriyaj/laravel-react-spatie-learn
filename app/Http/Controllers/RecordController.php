<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class RecordController extends Controller
{
    public function index()
    {
        // Permission check for viewing all records
        if (Auth::user()->can('view_all_records')) {
            $records = Record::all();
        } elseif (Auth::user()->can('view_own_records')) {
            // View only own records
            $records = Record::where('user_id', Auth::id())->get();
        } else {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Records/Index', [
            'auth' => Auth::user(),
            'records' => $records,
        ]);
    }

    public function create()
    {
        $this->authorize('create_records');

        return inertia('Records/Create', [
            'auth' => Auth::user(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create_records');

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = Auth::id();

        Record::create($data);

        return redirect()->route('records.index')->with('success', 'Record created successfully.');
    }

    public function edit(Record $record)
    {
        $this->authorize('edit_all_records');

        if (!Auth::user()->can('edit_all_records') && $record->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return inertia('Records/Edit', [
            'auth' => Auth::user(),
            'record' => $record,
        ]);
    }

    public function update(Request $request, Record $record)
    {
        if (!Auth::user()->can('edit_all_records') && $record->user_id !== Auth::id()) {
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
        if (!Auth::user()->can('delete_all_records') && $record->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $record->delete();

        return redirect()->route('records.index')->with('success', 'Record deleted successfully.');
    }
}
