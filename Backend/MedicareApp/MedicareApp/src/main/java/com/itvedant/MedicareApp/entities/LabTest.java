package com.itvedant.MedicareApp.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
  private  Long id;

    @NotBlank(message = "Name should not be Negative")
    private String name;

    @Positive(message = "Price should not be negative")
    private double price;

    @NotBlank(message = "Description field should not be blank")
    private String description;

    @NotBlank(message = "Category field should not be blank")
    private String category;




}
