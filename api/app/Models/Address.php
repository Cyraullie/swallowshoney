<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = ['address', 'city', 'npa', 'country', 'users_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'addresses_id');
    }
}
