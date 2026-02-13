<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'user_id',
        'job_id',
        'status',
        // 'onedatahr_ref_id', // nanti diisi setelah sukses kirim API
    ];
}
