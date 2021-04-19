<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAll()
    {
        $userList = array();
        foreach (User::orderBy('name', 'asc')->get() as $userItem) {
            $userItem->phone;
            array_push($userList, $userItem);
        }
        return $userList;
    }
}
