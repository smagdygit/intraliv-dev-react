<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Staff;

class Mobile extends Model
{
    use HasFactory;

    protected $fillable = [
        'wp',
        'name',
        'model',
        'usable',
        'installed',
        'hardware',
        'phoniro_status',
        'phoniro_home_area',
        'actual_home_area',
        'location',
        'sim_status',
        'sim_code',
        'sim_number',
        'belongs_to',
        'comment',
    ];

    public function staff()
    {
        return $this->hasMany(Staff::class, 'phone_id');
    }
}
