<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'id',
        'total_price',
        'nb_order',
        'created_date',
        'addresses_id',
        'state',
        'tva',
        'shipping_cost',
        'additional_message',
        'users_id',
    ];

    protected $hidden = [
        'users_id',
        'addresses_id',
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'addresses_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'orders_has_products', 'orders_id', 'products_id')->withPivot('quantity');
    }
}
