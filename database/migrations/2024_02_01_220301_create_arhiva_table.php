<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('arhiva', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id'); 
            $table->dateTime('pocetni_datum');
            $table->dateTime('krajnji_datum');
            $table->string('tip_odsustva');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arhiva');
    }
};
