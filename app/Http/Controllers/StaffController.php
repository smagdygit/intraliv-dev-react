<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;

class StaffController extends Controller
{
    public function all()
    {
        $staffList = array();
        foreach (Staff::orderBy('name', 'asc')->get() as $staff) {

            //Convert bools
            $staff->admin = $staff->admin === 1 ? true : false;
            $staff->active = $staff->active === 1 ? true : false;
            $staff->education = $staff->education === 1 ? true : false;
            $staff->door_key = $staff->door_key === 'Har' ? true : false;
            $staff->group = $staff->group === -1 ? 'Osäker' : $staff->group;

            //Mobiles
            $staff->mobile;

            array_push($staffList, $staff);
        }
        return ['status' => 'ok', 'staff' => $staffList];
    }

    public function renameOrCreate($create, $id, $newName)
    {
        $dir = $_ENV['PATH_FOLDERS'] . '/personal/';
        if (!$create) {
            $folders = scandir($dir);
            $result = '';
            foreach ($folders as $folder) {
                if (str_contains($folder, 'id-' . $id . '-id')) {
                    $result = $folder;
                    break;
                }
            }
            $oldFolder = $dir . '/' . $result;
            $newFolder = $dir . '/' . $newName . ' id-' . $id . '-id';
            rename($oldFolder, $newFolder);
        } else {
            mkdir($dir . '/' . $newName . ' id-' . $id . '-id', 0700);
        }
        return true;
    }

    public function correctData($input)
    {
        $list = [
            'name' => ['s'],
            'email' => ['s'],
            'staff_number' => ['r', [-1, 9999999], -1],
            'carefox_id' => ['r', [-1, 9999999], -1],
            'group' => ['r', [1, 2], 2],
            'employment_type' => ['s'],
            'phone_status' => ['s'],
            'phone_id' => ['r', [-1, 9999999], -1],
            'sith_status' => ['s'],
            'sith_hsa' => ['s'],
            'home_area' => ['s'],
            'admin' => ['b'],
            'active' => ['b'],
            'education' => ['b'],
            'door_key' => ['s'],
            'card' => ['s'],
            'it_policy' => ['s'],
            'drivers_license' => ['s'],
            'comment' => ['s'],
            'employment_expiry' => ['d'],
            'delegation' => ['d'],
            'monthly_hours' => ['d'],
            'work_percentage' => ['d'],
        ];

        
    }

    public function update(Request $request)
    {
        /*if (!Phone::where('id', $request->phone_id)->exists()) {
            return ['status' => 'bad-data', 'field' => 'phone_id', 'text' => 'Telefon-id\'t du valde existerar ej, vänligen skapa denna telefon först eller välj en annan'];
        }*/

        $personId = $request->id;
        if (Staff::where('id', $personId)->exists()) {
            $oldPerson = Staff::where('id', $personId)->first();
            $oldPerson->update([
                'name' => $request->name ?: '',
                'email' => $request->email ?: '',
                'staff_number' => $request->staff_number ?: -1,
                'carefox_id' => $request->carefox_id ?: -1,
                'group' => $request->group === 'Osäker' ? -1 : $request->group,
                'employment_type' => $request->employment_type,
                'phone_status' => $request->phone_status,
                'phone_id' => $request->phone_id ?: 0,
                'sith_status' => $request->sith_status,
                'sith_hsa' => $request->sith_hsa ?: '',
                'home_area' => $request->home_area,
                'admin' => $request->admin ? true : false,
                'active' => $request->active ? true : false,
                'education' => $request->education ? true : false,
                'door_key' => $request->door_key ? 'Har' : 'Har EJ',
                'card' => $request->card,
                'it_policy' => $request->it_policy,
                'drivers_license' => $request->drivers_license,
                'comment' => $request->comment ?: '',
                'employment_expiry' => $request->employment_expiry,
                'delegation' => $request->delegation,
                'monthly_hours' => $request->monthly_hours ?: 0,
                'work_percentage' => $request->work_percentage ?: null,
            ]);

            $this->renameOrCreate(false, $personId, $request->name);

            return ['status' => 'ok'];
        } else {
            //Person does not exist, error
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen person med Intraliv ID "' . $personId . '", prova att ladda om sidan'];
        }
    }

    public function create(Request $request)
    {
        /*if (!Phone::where('id', $request->phone_id)->exists()) {
            return ['status' => 'bad-data', 'field' => 'phone_id', 'text' => 'Telefon-id\'t du valde existerar ej, vänligen skapa denna telefon först eller välj en annan'];
        }*/

        $newPerson = Staff::create([
            'name' => $request->name ?: 'Okänt Namn',
            'email' => $request->email ?: '',
            'staff_number' => $request->staff_number ?: -1,
            'carefox_id' => $request->carefox_id ?: -1,
            'group' => $request->group === 'Osäker' ? -1 : $request->group,
            'employment_type' => $request->employment_type,
            'phone_status' => $request->phone_status,
            'phone_id' => $request->phone_id ?: 0,
            'sith_status' => $request->sith_status,
            'sith_hsa' => $request->sith_hsa ?: '',
            'home_area' => $request->home_area,
            'admin' => $request->admin ? true : false,
            'active' => $request->active ? true : false,
            'education' => $request->education ? true : false,
            'door_key' => $request->door_key ? 'Har' : 'Har EJ',
            'card' => $request->card,
            'it_policy' => $request->it_policy,
            'drivers_license' => $request->drivers_license,
            'comment' => $request->comment ?: '',
            'employment_expiry' => $request->employment_expiry,
            'delegation' => $request->delegation,
            'monthly_hours' => $request->monthly_hours ?: 0,
            'work_percentage' => $request->work_percentage ?: 0,
        ]);

        $this->renameOrCreate(true, $newPerson->id, $request->name);

        return ['status' => 'ok'];
    }
}
