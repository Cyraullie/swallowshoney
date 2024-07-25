<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'city' => $request->city,
            'address' => $request->address,
            'isdifferentbillingadress' => $request->isdifferentbillingadress,
            'billing_city' => $request->billing_city,
            'billing_address' => $request->billing_address,
        ]);

        // Authentifie l'utilisateur après l'enregistrement
        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
            ],
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
        $id = $request->input('id');
        $email = $request->input('email');

        $user = User::where('id', $id)->where('email', $email)->first();

        if ($user) {
            return response()->json([
                'message' => 'User found',
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
    }
}
