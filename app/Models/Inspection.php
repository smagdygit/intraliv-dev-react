<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Models\Car;

class Inspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'date',
        'approved',
        'comment',
    ];

    public function car() {
        return $this->belongsTo(Car::class);
    }

}
