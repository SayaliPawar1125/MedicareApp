package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
}
