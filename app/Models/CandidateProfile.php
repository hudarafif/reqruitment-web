<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{
    use HasFactory;

    // Tambahkan bagian ini (Daftar kolom yang boleh diisi)
    protected $fillable = [
        'user_id',
        'nik',
        'full_name',
        'phone',
        'birth_place',
        'birth_date',
        'gender',
        'religion',
        'address',
        'ktp_address',
        'height',
        'weight',
        'last_education',
        'school_name',
        'major',
        'gpa',
        'cv_path',
    ];

    // Opsional: Relasi ke User (biar gampang dipanggil nanti)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}