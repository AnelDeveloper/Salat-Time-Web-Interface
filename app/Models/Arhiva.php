<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arhiva extends Model
{
    use HasFactory;

    protected $table = 'arhiva';
    protected $fillable = ['user_id', 'pocetni_datum', 'krajnji_datum', 'tip_odsustva'];
}
