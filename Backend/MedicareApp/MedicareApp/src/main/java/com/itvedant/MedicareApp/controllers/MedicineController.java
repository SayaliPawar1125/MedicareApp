package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.Medicine;
import com.itvedant.MedicareApp.services.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicine")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {



        @Autowired
        private MedicineService medicineService;
        @PostMapping("/saveMedicine")
        public ResponseEntity<?> saveMedicine(@RequestBody Medicine medicine)
        {
            return  new ResponseEntity<>(medicineService.saveMedicine(medicine), HttpStatus.CREATED);
        }

    @GetMapping("/getAllmedicines")
    public ResponseEntity<?> getAllMedicines() {
        return new ResponseEntity<>(medicineService.getAllMedicines(), HttpStatus.OK);
    }
    }


