package com.itvedant.MedicareApp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "First Name is required")
    private String firstname;

    @NotBlank(message = "Last Name is required")
    private String lastname;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(
            min = 4,
            max = 20,
            message = "Password must be between 4 and 20 characters"
    )
    private String password;

    @NotBlank(message = "Phone is required")
    @Size(
            min = 10,
            max = 10,
            message = "Phone number must be 10 digits"
    )
    private String phone;

    private LocalDate dateOfBirth;

    private String gender;

    private String address;

    private String image;
}