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
            'address' => 'required|string',
            'birth_date' => 'required|date',
            'cv' => 'nullable|file|mimes:pdf|max:2048', // Max 2MB, PDF only
        ]);

        // 2. Cari atau Buat Profile baru untuk user ini
        $profile = CandidateProfile::firstOrNew(['user_id' => Auth::id()]);

        // 3. Update data text
        $profile->nik = $request->nik;
        $profile->full_name = $request->full_name;
        $profile->phone = $request->phone;
        $profile->address = $request->address;
        $profile->birth_date = $request->birth_date;

        // 4. Handle Upload CV (Jika ada file baru diupload)
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('cvs', 'public');
            $profile->cv_path = $path;
        }

        $profile->save();

        return Redirect::route('dashboard')->with('success', 'Biodata berhasil disimpan!');
    }
}