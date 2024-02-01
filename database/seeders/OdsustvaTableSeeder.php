<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OdsustvaTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('odsustva')->insert([
            [
                'user_id' => 1, // Fiksno za test
                'pocetni_datum' => Carbon::now()->subDays(10),
                'krajnji_datum' => Carbon::now()->subDays(5),
                'tip_odsustva' => 'Bolovanje'
            ],
        ]);
    }
}
