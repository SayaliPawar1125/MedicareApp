package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.Medicine;
import com.itvedant.MedicareApp.repositories.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    public Medicine saveMedicine(Medicine medicine)
    {
        return  medicineRepository.save(medicine);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }
}
