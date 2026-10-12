package com.itvedant.MedicareApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private  Long id;
    @NotBlank(message = "First Name is required")
    private String firstname;

    @NotBlank(message = "Last Name is required")
    private String lastname;

    @Email(message = "Not a Correct Email Format")

    private String email;
    @JsonIgnore
    @Column(nullable = false, length = 100)
    private String password;

    @Size(min = 10, max = 10, message = "Phone No Should be of 10 Digits")
    private String phone;

    private LocalDate dateOfBirth;
    private String gender;
    private String address;

    @NotBlank(message = "Role Is Required Field")
    private String role;

    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Appointments> appointments;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Patient> patients;
}
