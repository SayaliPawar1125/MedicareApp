package com.itvedant.MedicareApp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String role;
    private String token;
}