<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'total_price', 'users_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'users_id');
    }

    public function products()
    {
        return $this->belongsToMany('App\Product', 'orders_has_products', 'orders_id', 'products_id');
    }
}
