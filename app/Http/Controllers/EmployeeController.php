<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Phone;

class EmployeeController extends Controller
{
    public function renameOrCreate($create, $id, $newName)
    {
        $dir = $_ENV['PATH_FOLDERS'].'/personell/';
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

    public function getAll()
    {
        $employeeList = array();
        foreach (Employee::orderBy('name', 'asc')->get() as $employeeItem) {
            $employeeItem->phone;
            array_push($employeeList, $employeeItem);
        }
        return $employeeList;
    }

    public function create(Request $request)
    {
        if (strlen($request->name) < 3) {
            return ['status' => 'bad-data', 'field' => 'name', 'id' => 'bad-name', 'text' => 'Namnet måste vara minst 3 bokstäver långt'];
        }

        if (strlen($request->sith) === 0) {
            return ['status' => 'bad-data', 'field' => 'sith', 'id' => 'bad-sith', 'text' => 'Du måste välja en SITH status'];
        }

        if (!Phone::where('id', $request->phone_id)->exists()) {
            return ['status' => 'bad-data', 'field' => 'phone_id', 'text' => 'Telefon-id\'t du valde existerar ej, vänligen skapa denna telefon först eller välj en annan'];
        }

        if ((!isset($request->name)) || (!isset($request->care_id_2)) || (!isset($request->phone_id)) || (!isset($request->sith)) ||
            (!isset($request->admin)) || (!isset($request->active)) || (!isset($request->east)) || (!isset($request->lundby)) || (!isset($request->angered)) ||
            (!isset($request->vh)) || (!isset($request->backa)) || (!isset($request->education)) || (!isset($request->policy_it_signed)) ||
            (!isset($request->doorkey)) || (!isset($request->card)) || (!isset($request->group))
        ) {
            return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }

        $newPerson = Employee::create([
            'name' => $request->name,
            'email' => $request->email ?: '',
            'care_id_1' => '-1',
            'care_id_2' => $request->care_id_2,
            'phone_id' => $request->phone_id,
            'sith' => $request->sith,
            'admin' => $request->admin,
            'active' => $request->active,
            'east' => $request->east,
            'lundby' => $request->lundby,
            'angered' => $request->angered,
            'vh' => $request->vh,
            'backa' => $request->backa,
            'education' => $request->education,
            'policy_it_signed' => $request->policy_it_signed,
            'comment' => $request->comment ?? '',
            'doorkey' => $request->doorkey,
            'card' => $request->card,
            'group' => $request->group,
        ]);

        $this->renameOrCreate(true, $newPerson->id, $request->name);

        return ['status' => 'success', 'employees' => $this->getAll()];
    }

    public function update(Request $request)
    {
        if (strlen($request->name) < 3) {
            return ['status' => 'bad-data', 'field' => 'name', 'id' => 'bad-name', 'text' => 'Namnet måste vara minst 3 bokstäver långt'];
        }

        if (strlen($request->sith) === 0) {
            return ['status' => 'bad-data', 'field' => 'sith', 'id' => 'bad-sith', 'text' => 'Du måste välja en SITH status'];
        }

        if (!Phone::where('id', $request->phone_id)->exists()) {
            return ['status' => 'bad-data', 'field' => 'phone_id', 'text' => 'Telefon-id\'t du valde existerar ej, vänligen skapa denna telefon först eller välj en annan'];
        }

        if ((!isset($request->name)) || (!isset($request->care_id_2)) || (!isset($request->phone_id)) || (!isset($request->sith)) ||
            (!isset($request->admin)) || (!isset($request->active)) || (!isset($request->east)) || (!isset($request->lundby)) || (!isset($request->angered)) ||
            (!isset($request->vh)) || (!isset($request->backa)) || (!isset($request->education)) || (!isset($request->policy_it_signed)) ||
            (!isset($request->doorkey)) || (!isset($request->card)) || (!isset($request->group))
        ) {
            return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }

        $personId = $request->id;
        if (Employee::where('id', $personId)->exists()) {
            $oldPerson = Employee::where('id', $personId)->first();
            $oldPerson->update([
                'name' => $request->name,
                'email' => $request->email ?: '',
                'care_id_1' => '-1',
                'care_id_2' => $request->care_id_2,
                'phone_id' => $request->phone_id,
                'sith' => $request->sith,
                'admin' => $request->admin,
                'active' => $request->active,
                'east' => $request->east,
                'lundby' => $request->lundby,
                'angered' => $request->angered,
                'vh' => $request->vh,
                'backa' => $request->backa,
                'education' => $request->education,
                'policy_it_signed' => $request->policy_it_signed,
                'comment' => $request->comment ?? '',
                'doorkey' => $request->doorkey,
                'card' => $request->card,
                'group' => $request->group,
            ]);

            $this->renameOrCreate(false, $personId, $request->name);

            return ['status' => 'success', 'employees' => $this->getAll()];
        } else {
            //Person does not exist, error
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen person med Intraliv ID "' . $personId . '", prova att ladda om sidan'];
        }
    }

    public function delete(Request $request)
    {
        $personId = $request->id;
        if (Employee::where('id', $personId)->exists()) {
            $personToDelete = Employee::where('id', $personId)->first();
            $personToDelete->delete();
            return ['status' => 'success', 'employees' => $this->getAll()];
        } else {
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen person registrerad med detta id'];
        }
    }
}
