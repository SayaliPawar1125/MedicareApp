package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine,Long> {
}
