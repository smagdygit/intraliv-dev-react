<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Phone;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'care_id_1',
        'care_id_2',
        'excell_id',
        'phone_id',
        'sith',
        'policy_it_signed',
        'comment',
        'active',
        'admin',
        'east',
        'lundby',
        'angered',
        'vh',
        'backa',
        'education',
    ];

    public function phone()
    {
        return $this->belongsTo(Phone::class);
    }
}
