<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jobs')->insert([
            [
                'title' => 'Backend Developer (Laravel)',
                'slug' => 'backend-developer-laravel',
                'description' => 'Kami mencari ahli Laravel yang mengerti API dan Database.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Frontend Developer (React)',
                'slug' => 'frontend-developer-react',
                'description' => 'Dicari developer yang jago ReactJS dan Tailwind CSS.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'HR Staff',
                'slug' => 'hr-staff',
                'description' => 'Mengurus administrasi karyawan dan rekrutmen.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}