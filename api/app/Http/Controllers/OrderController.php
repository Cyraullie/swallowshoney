<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrdersHasProduct;

class OrderController extends Controller
{
    // Vos fonctions de contrôleur pour Order vont ici

    function store (Request $request)
    {

        $basketContent = $request->input("basketContent");

        try {
            $order = new Order();
            $order->users_id = $request->input("users_id");
            $order->total_price = $request->input("totalPrice");

            $order->save();

       
            foreach ($basketContent as $product) {
                $orderHasProduct = new OrdersHasProduct();
                $orderHasProduct->products_id = $product["id"];
                $orderHasProduct->orders_id = $order["id"];
                $orderHasProduct->quantity = $product["quantity"];
                $orderHasProduct->save();
            }
           
            

            return response("Ok", 200);
        } catch (\Exception $e) {
            return response('Bad request:' . $e->getMessage(), 400);
        }
    }
}
