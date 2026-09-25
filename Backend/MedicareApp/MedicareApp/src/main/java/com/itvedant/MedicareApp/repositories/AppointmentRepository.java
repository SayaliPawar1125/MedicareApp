package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointments,Long> {
}
