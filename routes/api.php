<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalatTimesController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\RamadanTimetableController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/salat-times', [SalatTimesController::class, 'getSalatTimes']);
Route::get('/locations', [LocationsController::class, 'getLocations']);
Route::get('/monthly-salat-times', [SalatTimesController::class, 'getMonthlySalatTimes']);

Route::get('/ramadan-timetable', [RamadanTimetableController::class, 'getRamadanTimetable']);
