<?php

namespace App\Http\Controllers;

use App\Models\SalatTime;
use App\Models\Location;
use Illuminate\Http\Request;
use MohamedSabil83\LaravelHijrian\Facades\Hijrian;

class RamadanTimetableController extends Controller {
    public function getRamadanTimetable(Request $request) {
        $locationId = $request->input('locationId');
        $gregorianYear = $request->input('year');


        $startOfYearGregorian = "{$gregorianYear}-01-01";
        $hijriYearStart = Hijrian::hijri($startOfYearGregorian)->format('Y');
        
        $startRamadanHijri = "{$hijriYearStart}-09-01";
        $endRamadanHijri = "{$hijriYearStart}-09-30";
        
        $startRamadanGregorian = Hijrian::gregory($startRamadanHijri)->format('Y-m-d');
        $endRamadanGregorian = Hijrian::gregory($endRamadanHijri)->format('Y-m-d');
        
        $ramadanTimetable = SalatTime::where('location_id', $locationId)
                                      ->whereBetween('date', [$startRamadanGregorian, $endRamadanGregorian])
                                      ->orderBy('date', 'asc')
                                      ->get();

        return response()->json($ramadanTimetable);
    }
}
