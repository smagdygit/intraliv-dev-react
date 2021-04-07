<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PhoneController;

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


Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);
Route::get('employees', [EmployeeController::class, 'getAll']);
Route::post('employees', [EmployeeController::class, 'create']);
Route::delete('employees', [EmployeeController::class, 'delete']);
Route::put('employees', [EmployeeController::class, 'update']);
Route::get('phones', [PhoneController::class, 'getAll']);
Route::post('phones', [PhoneController::class, 'create']);
Route::delete('phones', [PhoneController::class, 'delete']);
Route::put('phones', [PhoneController::class, 'update']);

Route::middleware('auth:api')->group(function () {
    Route::resource('posts', PostController::class);
});
