package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.Appointments;
import com.itvedant.MedicareApp.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AppointmentService {


        @Autowired
        private AppointmentRepository appointmentRepository;
        public Appointments addAppointment(Appointments appointment)

        {
                appointment.setStatus("pending");
                return  appointmentRepository.save(appointment);
        }

        public List<Appointments> getAllAppointments()
        {

                return appointmentRepository.findAll();
        }

        public Appointments confirmAppointment(Long id)
        {
                Appointments appointments=appointmentRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("Appointment not Booked"));
        appointments.setStatus("Booked");
        return appointments;
        }

        public Appointments processPayment(Long id, Double payamount, String paymode) {
                Appointments appointment = appointmentRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Appointment Not Found"));

                appointment.setBillamount(payamount);
                appointment.setPaymentmode(paymode);
                appointment.setStatus("Booked");
                appointment.setPaymentstatus("Paid");
                return appointmentRepository.save(appointment);
        }

        // Update appointment status from the admin panel
        public Appointments updateAppointmentStatus(Long id, String status) {
                Appointments appointment = appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Appointment not found with ID: " + id));

                if (status == null || status.isBlank()) {
                        throw new IllegalArgumentException("Appointment status is required");
                }

                String updatedStatus = status.trim().toUpperCase();

                Set<String> allowedStatuses =
                        Set.of("PENDING", "BOOKED", "COMPLETED", "CANCELLED");

                if (!allowedStatuses.contains(updatedStatus)) {
                        throw new IllegalArgumentException(
                                "Status must be PENDING, BOOKED, COMPLETED, or CANCELLED");
                }

                appointment.setStatus(updatedStatus);

                return appointmentRepository.save(appointment);
        }
}
