<?php

use App\Http\Controllers\CandidateProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', [JobController::class, 'index'])->name('jobs.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/biodata', [CandidateProfileController::class, 'edit'])->name('biodata.edit');
    Route::post('/biodata', [CandidateProfileController::class, 'update'])->name('biodata.update');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/jobs/{job}/apply', [JobController::class, 'apply'])->name('jobs.apply');

    // Admin Routes
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('jobs', \App\Http\Controllers\AdminJobController::class);
    });
});

require __DIR__.'/auth.php';
