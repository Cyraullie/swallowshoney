<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\Email;

class EmailController extends Controller
{
    public function sendWelcomeEmail(Request $request)
    {
        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        Mail::to($user->email)->send(new Email($user, 'emails.welcome'));

        return response()->json(['message' => 'Email sent!']);
    }

    public function recoverPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();;

        // Générer une chaîne de caractères aléatoires
        $bytes = random_bytes(6);
            
        // Convertir les bytes en hexadécimal et tronquer à la longueur désirée
        $code = substr(bin2hex($bytes), 0, 6);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        Mail::to($user->email)->send(new Email($user, 'emails.recover', $code, "Révoquation de mot de passe"));

        return response()->json([
            'message' => 'Email sent!',
            'code' => $code,
        ]);
    }
    
    public function contact(Request $request)
    {
        $user = new User();
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
            
        Mail::to("hirondellehoney@gmail.com")->send(new Email($user, 'emails.contact', "", $request->subject, $request->message));

        return response()->json([
            'message' => 'Email sent!',
        ]);
        

    }
}
