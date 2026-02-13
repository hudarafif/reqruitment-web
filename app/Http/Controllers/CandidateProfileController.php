<?php

namespace App\Http\Controllers;

use App\Models\CandidateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CandidateProfileController extends Controller
{
    // Menampilkan halaman form
    public function edit()
    {
        // Ambil data profile user yang sedang login (jika ada)
        $profile = CandidateProfile::where('user_id', Auth::id())->first();

        return Inertia::render('Candidate/Edit', [
            'profile' => $profile
        ]);
    }

    // Menyimpan data form
    public function update(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'nik' => 'required|numeric|digits:16',
            'full_name' => 'required|string|max:255',
            'phone' => 'required|numeric',
            'birth_date' => 'required|date',
            'birth_place' => 'required|string|max:100',
            'gender' => 'required|in:Male,Female',
            'religion' => 'required|string|max:50',
            'address' => 'required|string',
            'ktp_address' => 'required|string',
            'height' => 'required|numeric|min:100|max:250',
            'weight' => 'required|numeric|min:30|max:200',
            'last_education' => 'required|string',
            'school_name' => 'required|string|max:150',
            'major' => 'required|string|max:100',
            'gpa' => 'required|numeric|min:0|max:4',
            'cv' => 'nullable|file|mimes:pdf|max:2048', // Max 2MB, PDF only
        ]);

        // 2. Cari atau Buat Profile baru untuk user ini
        $profile = CandidateProfile::firstOrNew(['user_id' => Auth::id()]);

        // 3. Update data text
        $profile->nik = $request->nik;
        $profile->full_name = $request->full_name;
        $profile->phone = $request->phone;
        $profile->birth_date = $request->birth_date;
        $profile->birth_place = $request->birth_place;
        $profile->gender = $request->gender;
        $profile->religion = $request->religion;
        $profile->address = $request->address;
        $profile->ktp_address = $request->ktp_address;
        $profile->height = $request->height;
        $profile->weight = $request->weight;
        $profile->last_education = $request->last_education;
        $profile->school_name = $request->school_name;
        $profile->major = $request->major;
        $profile->gpa = $request->gpa;

        // 4. Handle Upload CV (Jika ada file baru diupload)
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('cvs', 'public');
            $profile->cv_path = $path;
        }

        $profile->save();

        return Redirect::route('dashboard')->with('success', 'Biodata berhasil disimpan!');
    }
}