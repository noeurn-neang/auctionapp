<?php

namespace App\Utils;

class DummyUsers {
    
    const USERS = [
        [
            "id" => 1,
            "name" => 'user1',
            "password" => '123'
        ],
        [
            "id" => 2,
            "name" => 'user2',
            "password" => '123'
        ]
    ];

    /**
     * login user by name and password
     * @param string name
     * @param string password
     * 
     * @return object
     */
    public static function login($name, $password) {
        $index = array_search($name, array_column(self::USERS, 'name'));
        if($index > -1) {
            $user = self::USERS[$index];
            if($user["password"] == $password) {
                return $user;
            }
        }
        
        return null;
    }

    /**
     * find user by id
     * @param int id
     * 
     * @return object
     */
    public static function findUserById($id) {
        $index = array_search($id, array_column(self::USERS, 'id'));
        if($index > -1) {
            return self::USERS[$index];
        }
        
        return null;
    }
}