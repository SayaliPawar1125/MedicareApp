package com.itvedant.MedicareApp.controllers;


import com.itvedant.MedicareApp.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private LabTestRepository labTestRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/counts")
    public ResponseEntity<Map<String, Long>> getDashboardCounts() {

        Map<String, Long> counts = new HashMap<>();

        counts.put("totalAppointments", appointmentRepository.count());
        counts.put("totalDoctors", doctorRepository.count());
        counts.put("totalMedicines", medicineRepository.count());
        counts.put("totalLabTests", labTestRepository.count());
        counts.put("totalOrders", orderRepository.count());

        return ResponseEntity.ok(counts);
    }
}
