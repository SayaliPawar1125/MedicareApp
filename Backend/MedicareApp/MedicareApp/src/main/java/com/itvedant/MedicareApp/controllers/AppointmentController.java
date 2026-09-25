package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.Appointments;
import com.itvedant.MedicareApp.services.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
    @RequestMapping("/api/appointment")
@CrossOrigin(origins = "http://localhost:5173")
    public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/saveappointment")
    public ResponseEntity<?> addAppointment(@Valid @RequestBody
                                            Appointments appointment) {
        return new ResponseEntity<>(appointmentService.addAppointment(appointment), HttpStatus.CREATED);
    }


    @GetMapping("/getappointments")
    public ResponseEntity<?> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAllAppointments(),
                HttpStatus.OK);
    }

    @PutMapping("/confirm/{id}")
    public ResponseEntity<?> confirmAppointment(@PathVariable Long id) {
        return new ResponseEntity<>(appointmentService.confirmAppointment(id),
                HttpStatus.FOUND);
    }

        @PutMapping("/processpay/{id}")
        public ResponseEntity<?> processPayment(
                @PathVariable Long id,
                @RequestParam Double payment,
                @RequestParam String paymode) {

            return new ResponseEntity<>(
                    appointmentService.processPayment(id, payment, paymode),
                    HttpStatus.OK
            );
    }
}


