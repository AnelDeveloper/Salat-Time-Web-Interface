<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RadnikController;
use App\Http\Controllers\OdsustvoController;
use App\Http\Controllers\KalendarController;
use App\Http\Controllers\ArhivaController;


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


Route::get('/radnici', [RadnikController::class, 'index']); 
Route::get('/radnici/{radnik}', [RadnikController::class, 'show']);
Route::post('/radnici', [RadnikController::class, 'store']);
Route::put('/radnici/{radnik}', [RadnikController::class, 'update']); 
Route::delete('/radnici/{radnik}', [RadnikController::class, 'destroy']); 


Route::get('/odsustva', [OdsustvoController::class, 'index']); 
Route::get('/odsustva/{odsustvo}', [OdsustvoController::class, 'show']); 
Route::post('/odsustva', [OdsustvoController::class, 'store']);
Route::put('/odsustva/{odsustvo}', [OdsustvoController::class, 'update']); 
Route::delete('/odsustva/{odsustvo}', [OdsustvoController::class, 'destroy']);

Route::get('/kalendar', [KalendarController::class, 'generateCalendarData']);



Route::post('/arhiviraj-odsustva', [ArhivaController::class, 'sacuvajUArhivu']);
Route::get('/arhiva', [ArhivaController::class, 'getArhiva']);
