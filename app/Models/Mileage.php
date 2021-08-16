<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Models\Car;

class Mileage extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'date',
        'mileage',
    ];

    public function car() {
        return $this->belongsTo(Car::class);
    }

}
