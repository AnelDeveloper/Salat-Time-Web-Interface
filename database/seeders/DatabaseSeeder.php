<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
   
    public function run()
    {
        $this->call([
            RadniciTableSeeder::class,
            OdsustvaTableSeeder::class,
            ArhivaTableSeeder::class,
        ]);
    }
    
}
