<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/user', [UserController::class, 'data']);
Route::post('/check_code', [UserController::class, 'check_code']);
Route::post('/change_password', [UserController::class, 'change_password']);

Route::get("/products", [ProductController::class, "show_all"]);
Route::get("/product/{id}", [ProductController::class, "show"]);
Route::post("/order", [OrderController::class, "store"]);
Route::get("/order/{id}/{user_id}", [OrderController::class, "show"]);

Route::post("/recover", [EmailController::class, "recoverPassword"]);