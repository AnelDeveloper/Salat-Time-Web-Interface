<?php

namespace App\Http\Controllers;

use App\Models\Odsustvo;
use Illuminate\Http\Request;

class OdsustvoController extends Controller
{
    public function index()
    {
        $odsustva = Odsustvo::all();
        return response()->json($odsustva, 200);
    }

    public function show(Odsustvo $odsustvo)
    {
        return response()->json($odsustvo, 200);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'tip_odsustva' => 'required|string',
            'tip_odsustva' => 'required', 
        ]);
    
        $userID = 1; // This is your fixed user ID for testing
    
        $startDate = \Carbon\Carbon::parse($request->input('pocetni_datum'));
        $endDate = \Carbon\Carbon::parse($request->input('krajnji_datum'));
    
        // Check for valid date range
        if ($startDate->gt($endDate)) {
            return response()->json(['message' => 'Neispravan opseg datuma.'], 400);
        }
    
        if ($request->input('tip_odsustva') == 'Bolovanje') {
            $monthStart = $startDate->copy()->startOfMonth();
            $monthEnd = $startDate->copy()->endOfMonth();
    
            $totalDaysThisMonth = Odsustvo::where('user_id', $userID)
                                  ->where('tip_odsustva', 'Bolovanje')
                                  ->whereBetween('pocetni_datum', [$monthStart, $monthEnd])
                                  ->sum(\DB::raw('DATEDIFF(krajnji_datum, pocetni_datum) + 1'));
    
            $requestedDays = $endDate->diffInDays($startDate) + 1;
    
            if (($totalDaysThisMonth + $requestedDays) > 7) {
                return response()->json(['error' => 'Prekoračili ste dozvoljenih 7 dana bolovanja u mesecu.'], 400);
            }
        }
    
        if ($request->input('tip_odsustva') == 'Godisnji Odmor' && ($startDate->isWeekend() || $endDate->isWeekend())) {
            return response()->json(['error' => 'Registrovanje godišnjeg odmora vikendom nije dozvoljeno.'], 400);
        }
    
        $odsustvo = new Odsustvo;
        $odsustvo->user_id = $userID;
        $odsustvo->pocetni_datum = $startDate;
        $odsustvo->krajnji_datum = $endDate;
        $odsustvo->tip_odsustva = $request->input('tip_odsustva');
        $odsustvo->tip_odsustva = $request->input('tip_odsustva');
        $odsustvo->save();
    
        return response()->json(['message' => 'Odsustvo je uspešno kreirano'], 201);
    }
    
    
    

    public function update(Request $request, Odsustvo $odsustvo)
    {
        $request->validate([
            'datum' => 'required|date',
        ]);

        $odsustvo->datum = $request->input('datum');
        $odsustvo->save();

        return response()->json(['message' => 'Odsustvo je uspješno ažurirano'], 200);
    }

    public function destroy(Odsustvo $odsustvo)
    {
        $odsustvo->delete();
        return response()->json(['message' => 'Odsustvo je uspješno obrisano'], 200);
    }
}
