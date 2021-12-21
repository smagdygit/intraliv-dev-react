<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mobile;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'staff_number',
        'carefox_id',
        'group',
        'employment_type',
        'phone_status',
        'phone_id',
        'sith_status',
        'sith_hsa',
        'home_area',
        'admin',
        'active',
        'education',
        'door_key',
        'card',
        'it_policy',
        'drivers_license',
        'comment',
        'employment_expiry',
        'delegation',
    ];

    public function mobile()
    {
        return $this->belongsTo(Mobile::class,  'phone_id', 'id');
    }
}
