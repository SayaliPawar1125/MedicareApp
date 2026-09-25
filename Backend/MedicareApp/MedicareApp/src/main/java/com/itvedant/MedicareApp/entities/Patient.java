package com.itvedant.MedicareApp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;




@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @NotBlank(message = "FirstName is Required Field")
    private String firstname;

    @NotBlank(message = "LastName is Required Field")
    private String lastname;

    private String gender;

    private LocalDate dateofbirth;
    @Size(min = 10, max = 10, message = "Phone No Should be 10 Digits")
    private String phone;

    @Email(message = "InCorrect Format")
    private String email;

    @NotBlank(message = "Address is Required Field")
    private String address;

    @NotBlank(message = "BloodGroup is Required Field")
    private String bloodgroup;

    private LocalDateTime registrationdate;
}


