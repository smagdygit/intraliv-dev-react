<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Employee;

class Phone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user',
        'status',
        'free',
        'personal',
        'east',
        'lundby',
        'angered',
        'vh',
        'backa',
        'phoniro_status',
        'comment',
        'telenumber',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'phone_id');
    }
}
