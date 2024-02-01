<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Odsustvo extends Model
{
    protected $table = 'odsustva';

    protected $fillable = ['pocetni_datum', 'krajnji_datum', 'tip_odsustva'];

    

    public function radnik()
    {
        return $this->belongsTo(Radnik::class);
    }
}