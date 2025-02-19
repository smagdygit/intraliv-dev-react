<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Fuel;
use App\Models\Inspection;
use App\Models\Mileage;
use App\Models\Service;
use Illuminate\Http\Request;

class CarController extends Controller
{

    public function get(Request $request, $id)
    {
        if (Car::where('id', $id)->exists()) {
            $car = Car::where('id', $id)->first();

            $car->fuel;
            $car->inspection;
            $car->mileage;

            $car->service;
            foreach ($car->service as $serv) {
                $serv['result'] = $serv['approved'] ? 'approved' : 'denied';
            }

            return ['status' => 'success', 'car' => $car];
        } else {
            return ['status' => 'error', 'text' => 'Bilen med detta ID finns inte'];
        }
    }

    public function getAll()
    {
        $carList = array();
        foreach (Car::orderBy('plate', 'asc')->get() as $carItem) {
            $carItem->fuel;
            $carItem->inspection;
            $carItem->mileage;

            $carItem->service;
            foreach ($carItem->service as $serv) {
                $serv['result'] = $serv['approved'] ? 'approved' : 'denied';
            }

            array_push($carList, $carItem);
        }
        return $carList;
    }

    public function create(Request $request)
    {

        $newCar = Car::create([
            'plate' => $request->plate,
            'bought_location' => '', //$request->bought_location,
            'bought_date' => null, //$request->bought_date,
            'brand' => $request->brand ?: '',
            'model' => $request->model ?: '',
            'station' => $request->station ?: '',
            'color' => '', //$request->color,
            'comment' => $request->comment ?: '',
            'abax' => $request->abax,
            'employee_car' => true, //$request->employee_car,
            'benefit' => false, //$request->benefit,
            'automatic' => $request->automatic ?: false,
            'insurance_cost' => $request->insurance_cost ?: 0,
            'max_mileage' => $request->max_mileage ?: 0,
            'wheels_summer_amount' => $request->wheels_summer_amount ?: 0,
            'wheels_summer_type' => $request->wheels_summer_type ?: '',
            'wheels_winter_amount' => $request->wheels_winter_amount ?: 0,
            'wheels_winter_type' => $request->wheels_winter_type ?: '',
            'wheels_location' => '', //$request->wheels_location,
            'winter_wheels_on' => $request->wheels_winter_on ?: false,
            'oil_checked' => null, //$request->oil_checked,
            'washed' => null, //$request->washed,
            'next_inspection' => $request->next_inspection,
            'next_service' => $request->next_service,
            'next_full_service' => $request->next_full_service,
        ]);

        if ($request->has('fuel')) {
            foreach ($request->fuel as $fuelItem) {
                Fuel::create([
                    'car_id' => $newCar->id,
                    'date' => $fuelItem['date'],
                    'cost' => $fuelItem['cost'],
                ]);
            }
        }
        unset($fuelItem);

        if ($request->has('inspection')) {
            foreach ($request['inspection'] as $inspectionItem) {
                Inspection::create([
                    'car_id' => $newCar->id,
                    'date' => $inspectionItem['date'],
                    'approved' => $inspectionItem['result'] === 'approved' ? true : false,
                    'comment' => '',
                ]);
            }
        }
        unset($inspectionItem);

        if ($request->has('mileage')) {
            foreach ($request['mileage'] as $mileageItem) {
                Mileage::create([
                    'car_id' => $newCar->id,
                    'date' => $mileageItem['date'],
                    'mileage' => $mileageItem['mileage'],
                ]);
            }
        }
        unset($mileageItem);

        if ($request->has('service')) {
            foreach ($request['service'] as $serviceItem) {
                Service::create([
                    'car_id' => $newCar->id,
                    'date' => $serviceItem['date'],
                    'full_service' => $serviceItem['full_service'],
                    'comment' => 0,
                ]);
            }
        }
        unset($serviceItem);

        //Success
        return ['status' => 'success', 'id' => 'success', 'car' => $newCar];
    }

    public function update(Request $request)
    {
        //Check if car exists
        if (Car::where('id', $request->id)->exists()) {

            //Update car data
            Car::where('id', $request->id)->first()->update([
                'plate' => $request->plate,
                'bought_location' => '', //$request->bought_location,
                'bought_date' => null, //$request->bought_date,
                'brand' => $request->brand ?: '',
                'model' => $request->model ?: '',
                'station' => $request->station ?: '',
                'color' => '', //$request->color,
                'comment' => $request->comment ?: '',
                'abax' => $request->abax,
                'employee_car' => true, //$request->employee_car,
                'benefit' => false, //$request->benefit,
                'automatic' => $request->automatic ?: false,
                'insurance_cost' => $request->insurance_cost ?: 0,
                'max_mileage' => $request->max_mileage ?: 0,
                'wheels_summer_amount' => $request->wheels_summer_amount ?: 0,
                'wheels_summer_type' => $request->wheels_summer_type ?: '',
                'wheels_winter_amount' => $request->wheels_winter_amount ?: 0,
                'wheels_winter_type' => $request->wheels_winter_type ?: '',
                'wheels_location' => '', //$request->wheels_location,
                'winter_wheels_on' => $request->wheels_winter_on ?: false,
                'oil_checked' => null, //$request->oil_checked,
                'washed' => null, //$request->washed,
                'next_inspection' => $request->next_inspection,
                'next_service' => $request->next_service,
                'next_full_service' => $request->next_full_service,
            ]);

            //Replace fuel data
            Fuel::where('car_id', $request->id)->delete();

            if ($request->has('fuel')) {
                foreach ($request->fuel as $fuelItem) {
                    Fuel::create([
                        'car_id' => $request->id,
                        'date' => $fuelItem['date'],
                        'cost' => $fuelItem['cost'],
                    ]);
                }
            }
            unset($fuelItem);


            //Replace inspection data
            Inspection::where('car_id', $request->id)->delete();

            if ($request->has('inspection')) {
                foreach ($request['inspection'] as $inspectionItem) {
                    Inspection::create([
                        'car_id' => $request->id,
                        'date' => $inspectionItem['date'],
                        'approved' => $inspectionItem['result'] === 'approved' ? true : false,
                        'comment' => '',
                    ]);
                }
            }
            unset($inspectionItem);

            //Replace mileage data
            Mileage::where('car_id', $request->id)->delete();

            if ($request->has('mileage')) {
                foreach ($request['mileage'] as $mileageItem) {
                    Mileage::create([
                        'car_id' => $request->id,
                        'date' => $mileageItem['date'],
                        'mileage' => $mileageItem['mileage'],
                    ]);
                }
            }
            unset($mileageItem);

            //Replace service data
            Service::where('car_id', $request->id)->delete();

            if ($request->has('service')) {
                foreach ($request['service'] as $serviceItem) {
                    Service::create([
                        'car_id' => $request->id,
                        'date' => $serviceItem['date'],
                        'full_service' => $serviceItem['full_service'],
                        'comment' => 0,
                    ]);
                }
            }
            unset($serviceItem);

            //Success
            return ['status' => 'success'];
        } else {
            //Success
            return ['status' => 'error', 'text' => 'Bilen med detta ID finns ej'];
        }
    }

    public function delete(Request $request, $id)
    {
        if (Car::where('id', $id)->exists()) {
            $carToDelete = Car::where('id', $id)->first();
            $carToDelete->delete();
            Fuel::where('car_id', $id)->delete();
            Inspection::where('car_id', $id)->delete();
            Mileage::where('car_id', $id)->delete();
            Service::where('car_id', $id)->delete();
            return ['status' => 'success', 'cars' => $this->getAll()];
        } else {
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen bil registrerad med detta id'];
        }
    }
}




 /*$varArray = [
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
        ];*/

        /*foreach ($varArray as $currentVar) {
            if (!$request->has($currentVar)) return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }*/
