<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RecordController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('roles', RoleController::class);
});

Route::middleware(['auth'])->group(function () {

    // List all records (view all or own)
    Route::get('/records', [RecordController::class, 'index'])->name('records.index')
    ->middleware('can:view_all_records,view_own_records');

    // Create a new record
    Route::get('/records/create', [RecordController::class, 'create'])->name('records.create')
    ->middleware('can:create_records');
    Route::post('/records', [RecordController::class, 'store'])->name('records.store')
    ->middleware('can:create_records');

    // Edit a record
    Route::get('/records/{record}/edit', [RecordController::class, 'edit'])->name('records.edit')
    ->middleware('can:edit_all_records,edit_own_records,record');

    // Update a record
    Route::put('/records/{record}', [RecordController::class, 'update'])->name('records.update')
    ->middleware('can:edit_all_records,edit_own_records,record');

    // Delete a record
    Route::delete('/records/{record}', [RecordController::class, 'destroy'])->name('records.destroy')
    ->middleware('can:delete_all_records,delete_own_records,record');
});

require __DIR__.'/auth.php';
