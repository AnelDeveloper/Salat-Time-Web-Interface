<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalatTime extends Model {
    protected $fillable = ['location_id', 'date', 'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha', 'zenith'];

    public function location() {
        return $this->belongsTo(Location::class);
    }
}
