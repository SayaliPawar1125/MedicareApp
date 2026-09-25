package com.itvedant.MedicareApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private  Long id;
    @NotBlank(message = "Name Is Required Field")
    private String name;

    @Email(message = "Not a Correct Email Format")
    private String email;

    @Size(min = 4, max = 20, message = "Password minimum size is 4 and max size=20")
    private String password;

    @Size(min = 10, max = 10, message = "Phone No Should be of 10 Digits")
    private String phone;

    @NotBlank(message = "Role Is Required Field")
    private String role;

    @NotBlank(message = "Image Is Required Field")
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Appointments> appointments;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;


}
