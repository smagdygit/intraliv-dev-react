<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mobile;

class MobileController extends Controller
{
    public function all()
    {
        $phoneList = array();
        foreach (Mobile::orderBy('wp', 'asc')->get() as $mobile) {
            
            //Convert variables to be user friendly
            $mobile->sim_number = $mobile->sim_number === '-1' ? '' : $mobile->sim_number;
            $mobile->sim_code = $mobile->sim_code === '-1' ? '' : $mobile->sim_code;

            //Staff
            $mobile->staff;

            array_push($phoneList, $mobile);
        }
        return ['status' => 'ok', 'mobiles' => $phoneList];
    }

    public function create(Request $request)
    {
        if (Mobile::where('name', $request->name)->exists()) {
            return ['status' => 'duplicate', 'id' => 'duplicate_phone_name', 'text' => 'En telefon med detta namn existerar redan'];
        }

        $newPhone = Mobile::create([
            'wp' => $request->wp ?: -1,
            'name' => $request->name,
            'model' => $request->model ?: 'Okänd',
            'usable' => $request->usable,
            'installed' => $request->installed,
            'hardware' => $request->hardware,
            'phoniro_status' => $request->phoniro_status,
            'phoniro_home_area' => $request->phoniro_home_area ?: 'Okänd',
            'actual_home_area' => $request->actual_home_area ?: 'Okänd',
            'location' => $request->location ?: 'Okänd',
            'sim_status' => $request->sim_status,
            'sim_code' => $request->sim_code ?: -1,
            'sim_number' => $request->sim_number ?: -1,
            'belongs_to' => $request->belongs_to,
            'comment' => $request->comment ?: '',
        ]);

        return ['status' => 'ok'];
    }

    public function update(Request $request)
    {
        if (Mobile::where('name', $request->name)->where('id', '!=', $request->id)->exists()) {
            return ['status' => 'duplicate', 'id' => 'duplicate_phone_name', 'text' => 'En telefon med detta namn existerar redan'];
        }

        $phoneId = $request->id;
        if (Mobile::where('id', $phoneId)->exists()) {
            $oldPhone = Mobile::where('id', $phoneId)->first();
            $oldPhone->update([
                'wp' => $request->wp ?: -1,
                'name' => $request->name,
                'model' => $request->model ?: 'Okänd',
                'usable' => $request->usable,
                'installed' => $request->installed,
                'hardware' => $request->hardware,
                'phoniro_status' => $request->phoniro_status,
                'phoniro_home_area' => $request->phoniro_home_area ?: 'Okänd',
                'actual_home_area' => $request->actual_home_area ?: 'Okänd',
                'location' => $request->location ?: 'Okänd',
                'sim_status' => $request->sim_status,
                'sim_code' => $request->sim_code ?: -1,
                'sim_number' => $request->sim_number ?: -1,
                'belongs_to' => $request->belongs_to,
                'comment' => $request->comment ?: '',
            ]);

            return ['status' => 'ok'];
        } else {
            //Phone does not exist, error
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen telefon med ID "' . $phoneId . '", prova att ladda om sidan'];
        }
    }
}
