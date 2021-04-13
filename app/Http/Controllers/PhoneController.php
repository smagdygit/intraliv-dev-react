<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Phone;

class PhoneController extends Controller
{


    public function getAll()
    {
        $phoneList = array();
        foreach (Phone::orderBy('name', 'asc')->get() as $phoneItem) {
            $phoneItem->employees;
            array_push($phoneList, $phoneItem);
        }
        return $phoneList;
    }

    public function create(Request $request)
    {
        if ((!isset($request->name)) || (!isset($request->status)) || (!isset($request->free)) || (!isset($request->personal)) || (!isset($request->east)) ||
            (!isset($request->lundby)) || (!isset($request->angered)) || (!isset($request->phoniro_status))
        ) {
            return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }

        if (Phone::where('name', $request->name)->exists()) {
            return ['status' => 'duplicate', 'id' => 'duplicate_phone_name', 'text' => 'En telefon med detta namn existerar redan'];
        }

        $newPhone= Phone::create([
            'name' => $request->name,
            'status' => $request->status,
            'free' => $request->free,
            'personal' => $request->personal,
            'east' => $request->east,
            'lundby' => $request->lundby,
            'angered' => $request->angered,
            'phoniro_status' => $request->phoniro_status,
            'comment' => $request->comment ?? '',
        ]);

        Employee::whereIn('id', $request->employees)->update([
            'phone_id' => $newPhone->id
        ]);

        return ['status' => 'success', 'phones' => $this->getAll()];
    }

    public function update(Request $request)
    {
        if ((!isset($request->name)) || (!isset($request->status)) || (!isset($request->free)) || (!isset($request->personal)) || (!isset($request->east)) ||
            (!isset($request->lundby)) || (!isset($request->angered)) || (!isset($request->phoniro_status))
        ) {
            return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }

        $phoneId = $request->id;
        if (Phone::where('id', $phoneId)->exists()) {
            $oldPhone = Phone::where('id', $phoneId)->first();
            $oldPhone->update([
                'name' => $request->name,
                'status' => $request->status,
                'free' => $request->free,
                'personal' => $request->personal,
                'east' => $request->east,
                'lundby' => $request->lundby,
                'angered' => $request->angered,
                'phoniro_status' => $request->phoniro_status,
                'comment' => $request->comment ?? '',
            ]);

            Employee::whereIn('id', $request->employees)->update([
                'phone_id' => $oldPhone->id
            ]);

            return ['status' => 'success', 'employees' => $this->getAll()];
        } else {
            //Phone does not exist, error
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen telefon med ID "' . $phoneId . '", prova att ladda om sidan'];
        }
    }

    public function delete(Request $request)
    {
        $phoneId = $request->id;
        if (Phone::where('id', $phoneId)->exists()) {
            $phoneToDelete = Phone::where('id', $phoneId)->first();
            $phoneToDelete->delete();
            return ['status' => 'success', 'phones' => $this->getAll()];
        } else {
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen telefon registrerad med detta id'];
        }
    }
}
