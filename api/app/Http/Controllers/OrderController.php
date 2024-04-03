<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    // Vos fonctions de contrôleur pour Order vont ici

    function store (Request $request)
    {//TODO finir le fonction
        try {
            /*$order = new Order();
            $athlete->firstname = $request->input("firstname");
            $athlete->group_athlete_id1 = $request->input("group1");
            $athlete->group_athlete_id2 = $request->input("group2");
            $athlete->save();

            return response("Ok", 200);*/
        } catch (\Exception $e) {
            return response('Bad request:' . $e->getMessage(), 400);
        }
    }
}
