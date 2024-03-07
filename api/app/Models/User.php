<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'firstname', 'lastname', 'password', 'email', 'phone', 'city', 'address', 'isdifferentbillingadress', 'billing_city', 'billing_address'
    ];
}
