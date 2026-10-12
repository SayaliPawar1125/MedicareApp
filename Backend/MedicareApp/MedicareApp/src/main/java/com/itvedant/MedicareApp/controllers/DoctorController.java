
package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.Doctor;
import com.itvedant.MedicareApp.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/savedoctor")
    public ResponseEntity<?> saveDoctor(
            @Valid @RequestBody Doctor doctor) {
        try {
            return new ResponseEntity<>(
                    doctorService.saveDoctor(doctor),
                    HttpStatus.CREATED
            );
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/getAlldoctors")
    public ResponseEntity<?> getAllDoctors() {
        return ResponseEntity.ok(
                doctorService.getAllDoctors()
        );
    }

    @GetMapping("/getDoctorById/{id}")
    public ResponseEntity<?> getDoctorById(
            @PathVariable Long id) {

        Doctor doctor = doctorService.getDoctorById(id);

        if (doctor == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Doctor not found with id: " + id);
        }

        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/getDoctorBySpec/{spec}")
    public ResponseEntity<?> getDoctorBySpec(
            @PathVariable String spec) {

        return ResponseEntity.ok(
                doctorService.getBySpecialization(spec)
        );
    }

    @DeleteMapping("/deleteDoctor/{id}")
    public ResponseEntity<?> deleteDoctorById(
            @PathVariable Long id) {

        try {
            doctorService.deleteDoctor(id);

            return ResponseEntity.ok(
                    "Doctor deleted successfully"
            );

        } catch (IllegalStateException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/updateDoctor/{id}")
    public ResponseEntity<?> updateDoctorById(
            @Valid @RequestBody Doctor doctor,
            @PathVariable Long id) {

        Doctor updatedDoctor =
                doctorService.updateDoctor(doctor, id);

        if (updatedDoctor == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Doctor not found with id: " + id);
        }

        return ResponseEntity.ok(updatedDoctor);
    }
}