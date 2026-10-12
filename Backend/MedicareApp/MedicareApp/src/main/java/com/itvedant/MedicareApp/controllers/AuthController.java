package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.dto.LoginRequest;
import com.itvedant.MedicareApp.dto.LoginResponse;
import com.itvedant.MedicareApp.dto.RegisterRequest;
import com.itvedant.MedicareApp.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;


    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid
            @RequestBody RegisterRequest request) {

        String message = authService.register(request);

        return new ResponseEntity<>(
                message,
                HttpStatus.CREATED
        );
    }


    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.OK
        );
    }
}