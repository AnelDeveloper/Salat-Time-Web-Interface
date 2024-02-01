<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KalendarController extends Controller
{
    public function generateCalendarData() {
        $days = [];
        $date = now(); 
        $startOfMonth = $date->copy()->startOfMonth();
        $endOfMonth = $date->copy()->endOfMonth();

        for ($date = $startOfMonth; $date->lte($endOfMonth); $date->addDay()) {
            $days[] = [
                'date' => $date->toDateString(),
                'isWeekend' => in_array($date->dayOfWeek, [0, 6])
            ];
        }

        return response()->json($days);
    }
}
