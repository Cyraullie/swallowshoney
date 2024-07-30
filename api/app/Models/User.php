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
        'type_users_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'type_users_id',
    ];

    protected $casts = [
        'isdifferentbillingadress' => 'boolean',
    ];

    public function typeUser()
    {
        return $this->belongsTo(TypeUser::class, 'type_users_id');
    }

    public function addresses()
    {
        return $this->hasMany(Address::class, 'users_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'users_id');
    }
}
