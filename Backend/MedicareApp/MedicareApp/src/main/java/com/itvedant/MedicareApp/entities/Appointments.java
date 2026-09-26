package com.itvedant.MedicareApp.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "AppoinmentDate is Required")
    private String appointmentdate;

    private String timeslot;

    @NotBlank(message = "Reason Should not Be Blank")
    private String reason;

    @NotBlank(message = "status Should not Be Blank")
    private String status;

    @NotBlank(message = "PaymentStatus Should not Be Blank")
    private String paymentstatus;

    private String paymentmode;
    private Double billamount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @JsonIgnoreProperties("appointments")

    @ManyToOne
    @JoinColumn(name = "doc_id")
    private Doctor doctor;

    @ManyToOne(cascade = CascadeType.ALL) // Cascade type ALL ensures the patient is saved automatically if it's a new profile
    @JoinColumn(name = "patient_id")
    @JsonIgnoreProperties("appointments")
    private Patient patient;

}



