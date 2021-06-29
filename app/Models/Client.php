<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'care_type',
        'east',
        'lundby',
        'angered',
        'vh',
        'backa',
        'ssn',
        'address',
        'permitted_hours',
        'comment',
        'active',
    ];
}
