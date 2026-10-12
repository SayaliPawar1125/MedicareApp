package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.User;
import com.itvedant.MedicareApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;


    // ADD USER
    @PostMapping
    public ResponseEntity<User> addUser(
            @RequestBody User user) {

        User createdUser =
                userService.addUser(user);

        return new ResponseEntity<>(
                createdUser,
                HttpStatus.CREATED
        );
    }


    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users =
                userService.getAllUsers();

        return new ResponseEntity<>(
                users,
                HttpStatus.OK
        );
    }


    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        System.out.println(
                "========== USER CONTROLLER =========="
        );

        System.out.println(
                "REQUESTED USER ID: " + id
        );

        User user =
                userService.getUserById(id);

        if (user == null) {

            System.out.println(
                    "USER NOT FOUND: " + id
            );

            return ResponseEntity.notFound().build();
        }

        System.out.println(
                "USER FOUND: " + user.getEmail()
        );

        return ResponseEntity.ok(user);
    }


    // UPDATE USER
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @RequestBody User user,
            @PathVariable Long id) {

        User updatedUser =
                userService.updateUser(user, id);

        return new ResponseEntity<>(
                updatedUser,
                HttpStatus.OK
        );
    }


    // GET USERS BY ROLE
    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUserByRole(
            @PathVariable String role) {

        List<User> users =
                userService.getUserByRole(role);

        return new ResponseEntity<>(
                users,
                HttpStatus.OK
        );
    }
}