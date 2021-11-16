<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PhoneController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AbaxController;
use App\Http\Controllers\CarController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


//Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);

Route::post('cars', [CarController::class, 'create']);
Route::put('cars', [CarController::class, 'update']);
Route::get('cars', [CarController::class, 'getAll']);
Route::get('cars/{id}', [CarController::class, 'get']);
Route::delete('cars', [CarController::class, 'delete']);

Route::middleware('auth:api')->group(function () {
    Route::resource('posts', PostController::class);
    Route::get('employees', [EmployeeController::class, 'getAll']);
    Route::post('employees', [EmployeeController::class, 'create']);
    Route::delete('employees', [EmployeeController::class, 'delete']);
    Route::put('employees', [EmployeeController::class, 'update']);
    Route::get('test', [EmployeeController::class, 'test']);
    Route::get('phones', [PhoneController::class, 'getAll']);
    Route::post('phones', [PhoneController::class, 'create']);
    Route::delete('phones', [PhoneController::class, 'delete']);
    Route::put('phones', [PhoneController::class, 'update']);
    Route::get('users', [UserController::class, 'getAll']);
    Route::post('users', [UserController::class, 'create']);
    Route::delete('users', [UserController::class, 'delete']);
    Route::put('users', [UserController::class, 'update']);
    Route::get('clients', [ClientController::class, 'getAll']);
    Route::post('clients', [ClientController::class, 'create']);
    Route::delete('clients', [ClientController::class, 'delete']);
    Route::put('clients', [ClientController::class, 'update']);
    
    
});


Route::get('abax', [AbaxController::class, 'getAll']);