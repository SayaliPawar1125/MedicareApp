package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.LabTest;
import com.itvedant.MedicareApp.repositories.LabTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabTestService {

    @Autowired
    private LabTestRepository labTestRepository;

    public LabTest saveLabTest(LabTest labTest) {
        List<LabTest> testList = labTestRepository.findAll();
        for (LabTest lt : testList) {
            if (lt.getName().equalsIgnoreCase(labTest.getName()) &&
                    lt.getCategory().equalsIgnoreCase(labTest.getCategory())) {
                throw new RuntimeException("Lab Test Already Exists in this Category");
            }
        }
        return labTestRepository.save(labTest);
    }

    public List<LabTest> getAllLabTests() {
        return labTestRepository.findAll();
    }

    public LabTest getLabTestById(Long id) {
        return labTestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab Test Not Found with ID: " + id));
    }

    public Boolean deleteLabTest(Long id) {
        if (labTestRepository.existsById(id)) {
            labTestRepository.deleteById(id);
            return true;
        }
        throw new RuntimeException("Lab Test Not Found with ID: " + id);
    }
}
