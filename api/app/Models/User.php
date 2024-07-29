<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    
    public $timestamps = false;

    protected $fillable = [
        'gender',
        'firstname',
        'lastname',
        'email',
        'password',
        'phone',
        'city',
        'npa',
        'address',
        'country',
        'isdifferentbillingadress',
        'billing_city',
        'billing_address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'isdifferentbillingadress' => 'boolean',
    ];
}
