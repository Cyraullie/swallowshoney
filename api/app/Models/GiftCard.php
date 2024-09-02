<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftCard extends Model
{
    use HasFactory;

    // Si le nom de la table est différent de la convention par défaut
    protected $table = 'giftcards';
    public $timestamps = false;

    // Les attributs qui sont assignables en masse
    protected $fillable = [
        'code',
        'max_value',
        'value',
        'enabled',
        'orders_has_products_id',
    ];

    // Les relations

    public function orderProduct()
    {
        return $this->belongsTo(OrderProduct::class, 'orders_has_products_id');
    }

    // Les types des colonnes
    protected $casts = [
        'max_value' => 'decimal:2',
        'value' => 'decimal:2',
        'enabled' => 'boolean',
    ];
}
