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
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
