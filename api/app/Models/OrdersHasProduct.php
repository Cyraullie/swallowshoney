<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrdersHasProduct extends Model
{
    protected $fillable = [
        'orders_id', 'products_id', 'quantity',
    ];
    
    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo('App\Order', 'orders_id');
    }

    public function product()
    {
        return $this->belongsTo('App\Product', 'products_id');
    }
}
