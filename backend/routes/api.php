<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;

// Authenication
Route::post('/login', [AuthController::class, 'login']);

// Items
Route::get('/items', [ItemController::class, 'list']);
Route::get('/items/{item}', [ItemController::class, 'detail']);
Route::post('/bid', [ItemController::class, 'bid']);
Route::post('/bid/config-auto-bidding', [ItemController::class, 'configAutoBidding']);
Route::post('/bid/disable-auto-bidding', [ItemController::class, 'disableAutoBidding']);