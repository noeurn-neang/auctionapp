<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public function histories() {
        return $this->hasMany('App\Models\BidHistory')->orderBy('bid_amount', 'desc');
    }
}
