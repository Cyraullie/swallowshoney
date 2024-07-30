<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeUser extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $table = 'type_users';

    public function users()
    {
        return $this->hasMany(User::class, 'type_users_id');
    }
}
