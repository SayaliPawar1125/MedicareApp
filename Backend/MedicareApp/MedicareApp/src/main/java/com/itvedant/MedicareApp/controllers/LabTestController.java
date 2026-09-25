package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.LabTest;
import com.itvedant.MedicareApp.services.LabTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vi")
@CrossOrigin(origins = "http://localhost:5173")
public class LabTestController
{


        @Autowired
        private LabTestService labTestService;

        @PostMapping("/add")
        public ResponseEntity<?> addLabTest(@RequestBody LabTest labTest) {
            return new ResponseEntity<>(labTestService.saveLabTest(labTest), HttpStatus.CREATED);
        }

        @GetMapping("/all")
        public ResponseEntity<List<LabTest>> getAllLabTests() {
            return new ResponseEntity<>(labTestService.getAllLabTests(), HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<?> getLabTestById(@PathVariable Long id) {
            return new ResponseEntity<>(labTestService.getLabTestById(id), HttpStatus.OK);
        }

        @DeleteMapping("/delete/{id}")
        public ResponseEntity<?> deleteLabTest(@PathVariable Long id) {
            return new ResponseEntity<>(labTestService.deleteLabTest(id), HttpStatus.OK);
        }
    }