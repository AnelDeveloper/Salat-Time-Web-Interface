<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RadniciTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('radnici')->insert([
            ['ime' => 'Anel ', 'email' => 'anel@example.com'],
            ['ime' => 'Jovan ', 'email' => 'jovan@example.com'],
        ]);
    }
}
