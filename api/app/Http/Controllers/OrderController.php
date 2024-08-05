<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrdersHasProduct;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        
        // Valider les données entrantes
        $validatedData = $request->validate([
            'basketContent' => 'required|array',
            'users_id' => 'required|integer',
            'totalPrice' => 'required|numeric',
            'created_date' => 'required|date',
            'addresses_id' => 'required|integer',
            'tva' => 'required|numeric',
            'shipping_cost' => 'nullable|numeric',
            'additional_message' => 'nullable|string'
        ]);
        $basketContent = $validatedData['basketContent'];

        try {
            $orderCount = Order::count();

            $order = new Order();
            $order->users_id = $validatedData['users_id'];
            $order->total_price = $validatedData['totalPrice'];
            $order->nb_order = "SH" . $orderCount;
            $order->created_date = $validatedData['created_date'];
            $order->addresses_id = $validatedData['addresses_id'];
            $order->tva = $validatedData['tva'];
            $order->state = 'new';
            $order->shipping_costs = $validatedData['shipping_cost'] ?? 0;
            $order->additional_message = $validatedData['additional_message'] ?? '';
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
            return response('Bad request: ' . $e->getMessage(), 400);
        }
    }

    public function show($id, $user_id)
    {
        $order = Order::with(['user', 'address', 'products'])
        ->where('id', $id)
        ->where('users_id', $user_id)
        ->first();

        if ($order) {
            return response()->json([
                'message' => 'Order found',
                'order' =>  $order,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }
    }  
}
