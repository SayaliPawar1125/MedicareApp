package com.itvedant.MedicareApp.controllers;


import com.itvedant.MedicareApp.entities.Patient;
import com.itvedant.MedicareApp.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {



        @Autowired
        private PatientService patientService;
        @GetMapping("/getallPatient")
        public ResponseEntity<?> getAllPatients()
        {
            return new ResponseEntity<>(patientService.getAllPatients(), HttpStatus.OK);
        }
        @GetMapping("/getPatientById/{id}")
        public ResponseEntity<?> getPatientById(@PathVariable Long id)
        {
            return  new ResponseEntity<>(patientService.getPatientById(id),HttpStatus.FOUND);
        }

        @PostMapping("/savePatient")
        public ResponseEntity<?> savePatient(@RequestBody Patient patient)
        {
            ResponseEntity<?> responseEntity = new ResponseEntity<>
                    (patientService.savePatient(patient), HttpStatus.CREATED);
            return responseEntity;
        }
        @DeleteMapping("/deletePatient")
        public  ResponseEntity<?> deletePatient(@PathVariable Long id)
        {
            return  new ResponseEntity<>(patientService.deletePatient(id),HttpStatus.OK);
        }
        @PutMapping("/updatePatient")
        public ResponseEntity<?> updatePatient(@RequestBody Patient patient,@PathVariable Long id)
        {
            return  new ResponseEntity<>(patientService.updatePatient(patient,id),HttpStatus.OK);
        }
    }

