
package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.Appointments;
import com.itvedant.MedicareApp.entities.Doctor;
import com.itvedant.MedicareApp.repositories.AppointmentRepository;
import com.itvedant.MedicareApp.repositories.DoctorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentsRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor saveDoctor(Doctor doctor) {

        List<Doctor> doctorList = doctorRepository.findAll();

        for (Doctor existing : doctorList) {
            if (existing.getName() != null
                    && existing.getSpecialization() != null
                    && doctor.getName() != null
                    && doctor.getSpecialization() != null
                    && existing.getName().equalsIgnoreCase(
                    doctor.getName().trim())
                    && existing.getSpecialization().equalsIgnoreCase(
                    doctor.getSpecialization().trim())) {

                throw new IllegalArgumentException(
                        "A doctor with the same name and specialization already exists."
                );
            }
        }

        return doctorRepository.save(doctor);
    }

    @Transactional
    public Boolean deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Doctor not found with id: " + id
                        )
                );

        // Prevent deletion if appointments reference this doctor.
        boolean hasAppointments =
                appointmentsRepository.existsByDoctor_Id(id);

        if (hasAppointments) {
            throw new IllegalStateException(
                    "This doctor cannot be deleted because appointments exist. "
                            + "Keep the doctor record to preserve appointment history."
            );
        }

        doctorRepository.delete(doctor);

        return true;
    }

    public Doctor updateDoctor(Doctor doctor, Long id) {

        Optional<Doctor> optionalDoctor =
                doctorRepository.findById(id);

        if (optionalDoctor.isEmpty()) {
            return null;
        }

        Doctor existingDoctor = optionalDoctor.get();

        if (doctor.getName() != null) {
            existingDoctor.setName(doctor.getName());
        }

        if (doctor.getSpecialization() != null) {
            existingDoctor.setSpecialization(
                    doctor.getSpecialization()
            );
        }

        if (doctor.getExperience() != null) {
            existingDoctor.setExperience(
                    doctor.getExperience()
            );
        }

        if (doctor.getFees() != null) {
            existingDoctor.setFees(doctor.getFees());
        }

        if (doctor.getDescription() != null) {
            existingDoctor.setDescription(
                    doctor.getDescription()
            );
        }

        if (doctor.getImage() != null) {
            existingDoctor.setImage(doctor.getImage());
        }

        return doctorRepository.save(existingDoctor);
    }

    public List<Doctor> getBySpecialization(
            String specialization) {

        return doctorRepository.findBySpecialization(
                specialization
        );
    }
}