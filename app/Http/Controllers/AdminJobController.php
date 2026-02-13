<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Job::query()->withCount('applications');

        // Filter by Title
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by Status (active/inactive)
        if ($request->filled('status')) {
            $query->where('is_active', $request->status);
        }

        // Filter by Period
        if ($request->period) {
            if ($request->period === '7d') {
                $query->where('created_at', '>=', now()->subDays(7));
            } elseif ($request->period === '30d') {
                $query->where('created_at', '>=', now()->subDays(30));
            }
        }

        $jobs = $query->latest()->get();

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $jobs,
            'filters' => $request->only(['search', 'status', 'period']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Jobs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'job_type' => 'required|in:Full-time,Contract,Part-time,Internship',
            'workplace_type' => 'required|in:Onsite,Hybrid,Remote',
            'vacancy' => 'required|integer|min:1',
            'location' => 'required|string',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|gte:salary_min',
            'gender' => 'required|in:Male,Female,Any',
            'min_experience' => 'required|integer|min:0',
            'min_education' => 'required|string',
            'min_age' => 'nullable|integer|min:17',
            'max_age' => 'nullable|integer|gte:min_age',
            'skills' => 'nullable|string', // Comma separated
            'has_screening_question' => 'boolean',
            'is_active' => 'boolean',
        ]);

        Job::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(5),
            'category' => $validated['category'],
            'description' => $validated['description'],
            'job_type' => $validated['job_type'],
            'workplace_type' => $validated['workplace_type'],
            'vacancy' => $validated['vacancy'],
            'location' => $validated['location'],
            'salary_min' => $validated['salary_min'],
            'salary_max' => $validated['salary_max'],
            'gender' => $validated['gender'],
            'min_experience' => $validated['min_experience'],
            'min_education' => $validated['min_education'],
            'min_age' => $validated['min_age'],
            'max_age' => $validated['max_age'],
            'skills' => $validated['skills'],
            'has_screening_question' => $validated['has_screening_question'] ?? false,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.jobs.index')->with('success', 'Job created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        return Inertia::render('Admin/Jobs/Edit', [
            'job' => $job
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Job $job)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $job->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(5), // Update slug or keep? Let's update for now to match title changes
            'description' => $request->description,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('admin.jobs.index')->with('success', 'Job updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        $job->delete();
        return redirect()->route('admin.jobs.index')->with('success', 'Job deleted successfully.');
    }
}
