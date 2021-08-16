<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Fuel;
use App\Models\Inspection;
use App\Models\Mileage;
use App\Models\Service;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'plate',
        'bought_location',
        'bought_date',
        'brand',
        'model',
        'station',
        'color',
        'comment',
        'abax',
        'employee_car',
        'benefit',
        'automatic',
        'insurance_cost',
        'max_mileage',
        'wheels_summer_amount',
        'wheels_summer_type',
        'wheels_winter_amount',
        'wheels_winter_type',
        'wheels_location',
        'winter_wheels_on',
        'oil_checked',
        'washed',
    ];

    public function fuel() {
        return $this->hasMany(Fuel::class);
    }

    public function inspection() {
        return $this->hasMany(Inspection::class);
    }

    public function mileage() {
        return $this->hasMany(Mileage::class);
    }

    public function service() {
        return $this->hasMany(Service::class);
    }

}
