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
public class DoctorController
{
    @Autowired
    private DoctorService doctorService;
    @PostMapping("/savedoctor")
    public ResponseEntity<?> saveDoctor(@Valid @RequestBody Doctor doctor)
    {
        return  new ResponseEntity<>(doctorService.saveDoctor(doctor), HttpStatus.CREATED);
    }

    @GetMapping("/getAlldoctors")
    public ResponseEntity<?> getAllDoctors() {
        return new ResponseEntity<>(doctorService.getAllDoctors(), HttpStatus.OK);
    }

    @GetMapping("/getDoctorById/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        return new ResponseEntity<>(doctorService.getDoctorById(id), HttpStatus.FOUND);
    }

    @GetMapping("/getDoctorBySpec/{spec}")
    public ResponseEntity<?> getDoctorBySpec(@PathVariable String spec) {
        return new ResponseEntity<>(doctorService.getBySpecialization(spec), HttpStatus.FOUND);
    }

    @DeleteMapping("/deleteDoctor/{id}")
    public ResponseEntity<?> deleteDoctorById(@PathVariable Long id) {
        return new ResponseEntity<>(doctorService.deleteDoctor(id), HttpStatus.OK);
    }

    @PutMapping("/updateDoctor/{id}")
    public ResponseEntity<?> updateDoctorById(@RequestBody Doctor doctor, @PathVariable Long id) {
        return new ResponseEntity<>(doctorService.updateDoctor(doctor, id), HttpStatus.OK);
    }




}
