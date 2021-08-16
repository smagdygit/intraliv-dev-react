<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Models\Car;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'date',
        'full_service',
        'comment',
    ];
    
    public function car() {
        return $this->belongsTo(Car::class);
    }

}
