<?php

namespace App\Http\Controllers;

use App\Models\Odsustvo;
use App\Models\Arhiva; // Pretpostavimo da imate model Arhiva

class ArhivaController extends Controller
{
    public function sacuvajUArhivu()
    {
        try {
            \DB::beginTransaction();
    
            $odsustva = Odsustvo::all();
    
            foreach ($odsustva as $odsustvo) {
                $exists = Arhiva::where('user_id', $odsustvo->user_id)
                                ->where('pocetni_datum', $odsustvo->pocetni_datum)
                                ->where('krajnji_datum', $odsustvo->krajnji_datum)
                                ->exists();
    
                if (!$exists) {
                    Arhiva::create([
                        'user_id' => $odsustvo->user_id, 
                        'pocetni_datum' => $odsustvo->pocetni_datum,
                        'krajnji_datum' => $odsustvo->krajnji_datum,
                        'tip_odsustva' => $odsustvo->tip_odsustva,
                    ]);
                }
            }
    
            \DB::commit();
            return response()->json(['message' => 'Novi podaci su uspešno sačuvani u arhivi'], 200);
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json(['error' => 'Greška prilikom čuvanja u arhivi'], 500);
        }
    }

    public function getArhiva()
    {
        $arhivaPodaci = Arhiva::all();
        return response()->json($arhivaPodaci);
    }

    
    
    
}


