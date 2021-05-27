<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function renameOrCreate($create, $id, $newName)
    {
        $dir = $_ENV['PATH_FOLDERS'].'/clients/';
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
        $phoneList = array();
        foreach (Client::orderBy('name', 'asc')->get() as $phoneItem) {
            array_push($phoneList, $phoneItem);
        }
        return $phoneList;
    }

    public function create(Request $request)
    {
        if (strlen($request->name) < 3) {
            return ['status' => 'bad-data', 'field' => 'name', 'id' => 'bad-name', 'text' => 'Namnet måste vara minst 3 bokstäver långt'];
        }

        if (strlen($request->care_type) === 0) {
            return ['status' => 'bad-data', 'field' => 'sith', 'id' => 'bad-sith', 'text' => 'Du måste välja en vårdtyp'];
        }

        if ((!isset($request->name)) || (!isset($request->care_type)) || (!isset($request->east)) || (!isset($request->lundby)) || 
            (!isset($request->angered)) || (!isset($request->vh)) || (!isset($request->backa))
        ) {
            return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }

        $newPerson = Client::create([
            'name' => $request->name,
            'care_type' => $request->care_type,
            'east' => $request->east,
            'lundby' => $request->lundby,
            'angered' => $request->angered,
            'vh' => $request->vh,
            'backa' => $request->backa,
            'ssn' => $request->ssn ?: '',
            'address' => $request->address ?: '',
            'permitted_hours' => $request->permitted_hours ?: 0,
            'comment' => $request->comment ?: '',
        ]);

        $this->renameOrCreate(true, $newPerson->id, $request->name);

        return ['status' => 'success', 'clients' => $this->getAll()];
    }

    public function update(Request $request)
    {
        if (strlen($request->name) < 3) {
            return ['status' => 'bad-data', 'field' => 'name', 'id' => 'bad-name', 'text' => 'Namnet måste vara minst 3 bokstäver långt'];
        }

        if (strlen($request->care_type) === 0) {
            return ['status' => 'bad-data', 'field' => 'sith', 'id' => 'bad-sith', 'text' => 'Du måste välja en vårdtyp'];
        }

        if ((!isset($request->name)) || (!isset($request->care_type)) || (!isset($request->east)) || (!isset($request->lundby)) || 
            (!isset($request->angered)) || (!isset($request->vh)) || (!isset($request->backa))
        ) {
            return ['status' => 'missing-data', 'id' => 'missing-data', 'text' => 'Alla fält är ej ifyllda'];
        }

        $personId = $request->id;
        if (Client::where('id', $personId)->exists()) {
            $oldPerson = Client::where('id', $personId)->first();
            $oldPerson->update([
                'name' => $request->name,
                'care_type' => $request->care_type,
                'east' => $request->east,
                'lundby' => $request->lundby,
                'angered' => $request->angered,
                'vh' => $request->vh,
                'backa' => $request->backa,
                'ssn' => $request->ssn ?: '',
                'address' => $request->address ?: '',
                'permitted_hours' => $request->permitted_hours ?: 0,
                'comment' => $request->comment ?: '',
            ]);

            $this->renameOrCreate(false, $personId, $request->name);

            return ['status' => 'success', 'clients' => $this->getAll()];
        } else {
            //Person does not exist, error
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen brukare med Intraliv ID "' . $personId . '", prova att ladda om sidan'];
        }
    }

    public function delete(Request $request)
    {
        $personId = $request->id;
        if (Client::where('id', $personId)->exists()) {
            $personToDelete = Client::where('id', $personId)->first();
            $personToDelete->delete();
            return ['status' => 'success', 'clients' => $this->getAll()];
        } else {
            return ['status' => 'not-found', 'field' => 'id', 'id' => 'id-not-found', 'text' => 'Det finns ingen brukare registrerad med detta id'];
        }
    }
}
