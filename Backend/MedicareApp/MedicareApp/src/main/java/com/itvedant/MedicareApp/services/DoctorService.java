package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.Doctor;
import com.itvedant.MedicareApp.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService
{
    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors()
    {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id)
    {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor saveDoctor(Doctor doctor) {
        List<Doctor> doctorlist = doctorRepository.findAll();
        for (Doctor d : doctorlist) {
            if (d.getName().equalsIgnoreCase(doctor.getName()) &&
                    d.getSpecialization().equalsIgnoreCase(doctor.getSpecialization())) {

                throw new RuntimeException("Doctor Already Exists With Same Specialization");
            }
        }
        return doctorRepository.save(doctor);
    }

    public Boolean deleteDoctor(Long id)
    {
        doctorRepository.deleteById(id);
        return true;
    }

    public Doctor updateDoctor(Doctor doctor, Long id)
    {
        Optional<Doctor> optdoc = doctorRepository.findById(id);
        if(optdoc.isEmpty())
        {
            return null;
        }

        Doctor existingDoctor = optdoc.get();
        if(doctor.getName() != null)
            existingDoctor.setName(doctor.getName());
        if(doctor.getSpecialization() != null )
            existingDoctor.setSpecialization(doctor.getSpecialization());
        if (doctor.getExperience() != null)
            existingDoctor.setExperience(doctor.getExperience());

        if(doctor.getFees() != null)
            existingDoctor.setFees(doctor.getFees());

        if(doctor.getDescription()!=null)
            existingDoctor.setDescription(doctor.getDescription());
        if(doctor.getImage() != null)
            existingDoctor.setImage(doctor.getImage());
        return doctorRepository.save(existingDoctor);
    }

    public List<Doctor> getBySpecialization(String specialization)
    {
        List<Doctor> list = doctorRepository.findAll();
        return list.stream()
                .filter(d->d.getSpecialization().equalsIgnoreCase(specialization)).toList();
    }
}
