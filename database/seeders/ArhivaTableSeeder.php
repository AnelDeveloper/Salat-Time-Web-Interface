<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ArhivaTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('arhiva')->insert([
            [
                'user_id' => 1, // Fiksno Test
                'pocetni_datum' => Carbon::now()->subMonths(1),
                'krajnji_datum' => Carbon::now()->subMonths(1)->addDays(5),
                'tip_odsustva' => 'godisnji_odmor'
            ],
        ]);
    }
}
