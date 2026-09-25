package com.itvedant.MedicareApp.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")

    private  Long id;
    @NotBlank(message ="Name is required")
    private String name;
    @NotBlank(message = "Specialization is Required")
    private String specialization;
    @Min(value = 1, message = "Experience must be atleast 1 Year")
    private Integer experience;
    @Positive(message = "Fess should be Positive")
    private Double fees;
    @NotBlank(message = "Description should not be blank")
    private String description;

    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "doctor")
    private List<Appointments> appointments;


}
