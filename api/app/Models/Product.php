<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'discount', 'group_products_id'
    ];

    public function groupProduct()
    {
        return $this->belongsTo('App\GroupProduct', 'group_products_id');
    }
}
