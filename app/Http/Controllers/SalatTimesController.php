<?php

namespace App\Http\Controllers;

use App\Models\SalatTime;
use App\Models\Location;
use Illuminate\Http\Request;

class SalatTimesController extends Controller {
    public function getSalatTimes(Request $request) {

        $locationId = $request->input('locationId');
        $date = $request->input('date');

        $location = Location::find($locationId);
        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }

        $salatTimes = SalatTime::where('location_id', $location->id)
                               ->whereDate('date', $date)
                               ->get();

        return response()->json($salatTimes);
    }

    public function getMonthlySalatTimes(Request $request) {
        $locationId = $request->input('locationId');
        $year = $request->input('year');
        $month = $request->input('month');  
    
        $startDate = "{$year}-{$month}-01";
        $endDate = date("Y-m-t", strtotime($startDate));
    
        $location = Location::find($locationId);
        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }
    
        $salatTimes = SalatTime::where('location_id', $location->id)
                               ->whereBetween('date', [$startDate, $endDate])
                               ->orderBy('date', 'asc')
                               ->get();
    
        return response()->json($salatTimes);
    }
}

