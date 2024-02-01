<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOdsustvaTable extends Migration
{
    public function up()
    {
        Schema::create('odsustva', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->foreign('user_id')->references('id')->on('radnici'); 
            $table->datetime('pocetni_datum');
            $table->datetime('krajnji_datum'); 
            $table->string('tip_odsustva')->nullable();
            $table->timestamps();
        });
    }
    
    

    public function down()
    {
        Schema::dropIfExists('odsustva');
    }
}
