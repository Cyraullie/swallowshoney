<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name', 'description', 'price', 'discount', 'group_products_id'
    ];

    public function groupProduct()
    {
        return $this->belongsTo(GroupProduct::class, 'group_products_id');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'orders_has_products', 'products_id', 'orders_id')->withPivot('quantity');
    }
}
