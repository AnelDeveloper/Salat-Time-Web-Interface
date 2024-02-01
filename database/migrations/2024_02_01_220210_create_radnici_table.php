<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRadniciTable extends Migration
{
    public function up()
    {
        Schema::create('radnici', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('radnici');
    }
}

