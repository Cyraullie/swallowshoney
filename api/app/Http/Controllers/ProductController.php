<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Vos fonctions de contrôleur pour Product vont ici
    public function show_all()
    {
        $products = Product::all();
        return $products;
    }

    public function show($id)
    {
        $product = Product::find($id);
        return $product;
    }


}
