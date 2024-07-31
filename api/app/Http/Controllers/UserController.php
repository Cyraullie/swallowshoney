<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Address;
use App\Models\TypeUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        /*$request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:45',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'isdifferentbillingadress' => 'required|boolean',
            'billing_city' => 'nullable|string|max:255',
            'billing_address' => 'nullable|string|max:255',
        ]);*/

        $user = User::create([
            'gender' => $request->input('gender'),
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'type_users_id' => intval($request->typeClient),
        ]);

        $address = Address::create([
            'city' => $request->city,
            'npa' => $request->npa,
            'country' => $request->country,
            'address' => $request->address,
            'users_id' => $user->id,
        ]);

        // Authentifie l'utilisateur après l'enregistrement
        //Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        /*$request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);*/

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'User logged in successfully',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
            ],
        ]);
    }

    // Déconnexion de l'utilisateur
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function data(Request $request)
    {
        $user = User::with(['typeUser', 'defaultAddress', 'addresses', 'orders.products'])->find($request->id);

        if ($user) {
            return response()->json([
                'message' => 'User found',
                'user' =>  $user,
            ], 200);
        } else {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
    }   
    
    public function check_code(Request $request)
    {
        if ($request->code == $request->getCode) {
            $user = User::where('email', $request->email)->first();
            if ($user) {
                return response()->json([
                    'message' => 'User found',
                    'user_id' => $user->id
                ], 200);
            } else {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }
        }
        else {
            return response()->json([
                'message' => 'Code incorrect'
            ], 404);
        }
    }

    public function change_password(Request $request)
    {
        $user = User::find($request->user_id);
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
            return response()->json([
                'message' => 'Mot de passe changé',
            ], 200);
        } else {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
    }
}
