<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;
use App\Models\CandidateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobController extends Controller
{
    // Halaman Daftar Lowongan
    public function index()
    {
        // Ambil semua job aktif
        $jobs = Job::where('is_active', true)->get();

        // Cek user sudah melamar job apa saja (biar tombolnya nanti jadi "Sudah Melamar")
        $appliedJobIds = [];
        if (Auth::check()) {
            $appliedJobIds = Application::where('user_id', Auth::id())
                            ->pluck('job_id')
                            ->toArray();
        }

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'appliedJobIds' => $appliedJobIds
        ]);
    }

    // Proses Melamar (Apply)
    public function apply(Request $request, $jobId)
    {
        $user = Auth::user();

        // 1. Cek apakah user sudah isi biodata lengkap?
        $profile = CandidateProfile::where('user_id', $user->id)->first();
        
        $requiredFields = [
            'nik', 'full_name', 'phone', 'birth_place', 'birth_date', 'gender', 'religion', 
            'address', 'ktp_address', 'height', 'weight', 'last_education', 'school_name', 
            'major', 'gpa', 'cv_path'
        ];

        $isComplete = $profile && collect($requiredFields)->every(fn($field) => !empty($profile->$field));

        if (!$isComplete) {
            return redirect()->route('biodata.edit')
                ->with('error', 'Harap lengkapi seluruh kolom biodata wajib dan upload CV sebelum melamar.');
        }

        // 2. Cek apakah sudah pernah melamar job ini?
        $exists = Application::where('user_id', $user->id)
                            ->where('job_id', $jobId)
                            ->exists();
        if ($exists) {
            return back()->with('error', 'Anda sudah melamar posisi ini.');
        }

        // 3. Simpan Lamaran ke Database Lokal
        $application = Application::create([
            'user_id' => $user->id,
            'job_id' => $jobId,
            'status' => 'applied',
            // 'onedatahr_ref_id' => nanti diisi setelah sukses kirim API
        ]);

        // --- DISINI NANTI KITA TARUH KODE API KE ONEDATAHR ---

        return back()->with('success', 'Lamaran berhasil dikirim! HR kami akan mereview CV Anda.');
    }
}