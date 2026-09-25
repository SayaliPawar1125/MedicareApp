package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {
}
