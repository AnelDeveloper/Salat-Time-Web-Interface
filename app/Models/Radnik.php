<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Radnik extends Model
{
    protected $table = 'radnici';

    protected $fillable = [
        'ime', 'email', 
    ];

    public function odsustva()
    {
        return $this->hasMany(Odsustvo::class);
    }
}