<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Utils\DummyUsers;

class AuthController extends Controller
{
    public function login(Request $request) {
        // validation
        $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        $name = $request->name;
        $password = $request->password;

        $user = DummyUsers::login($name, $password);
        if($user == null) {
            return response()->json([
                'msg' => 'Incorrect name or password!'
            ]);
        }

        return response()->json([
            'msg' => 'Login success',
            'data' => $user
        ]);
    }
}
