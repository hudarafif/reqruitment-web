<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'is_active',
        'category',
        'job_type',
        'workplace_type',
        'vacancy',
        'location',
        'salary_min',
        'salary_max',
        'gender',
        'min_experience',
        'min_education',
        'min_age',
        'max_age',
        'skills',
        'has_screening_question',
    ];

    protected $casts = [
        'has_screening_question' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
