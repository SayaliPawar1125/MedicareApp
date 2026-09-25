package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.Patient;
import com.itvedant.MedicareApp.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService
{
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients()
    {

        return patientRepository.findAll();
    }
    public Patient getPatientById(Long id)
    {

        return  patientRepository.findById(id).orElse(null);
    }
    public Patient savePatient(Patient patient)
    {

        return patientRepository.save(patient);
    }
    public boolean deletePatient(Long id)
    {
        patientRepository.deleteById(id);
        return true;
    }
    public Patient updatePatient(Patient patient,Long id){
        Optional<Patient> optpat =  patientRepository.findById(id);
        if(optpat.isEmpty())
        {
            return null;

        }

        Patient existingPatient = optpat.get();
        if(patient.getFirstname()!=null)
            existingPatient.setFirstname(patient.getFirstname());
        if(patient.getLastname()!=null)
            existingPatient.setLastname(patient.getLastname());
        if(patient.getGender()!=null)
            existingPatient.setGender(patient.getGender());
        if(patient.getDateofbirth()!=null)
            existingPatient.setDateofbirth(patient.getDateofbirth());
        if(patient.getPhone() != null)
            existingPatient.setPhone(patient.getPhone());
        if(patient.getEmail() != null)
            existingPatient.setEmail(patient.getEmail());
        if(patient.getAddress() != null)
            existingPatient.setAddress(patient.getAddress());
        if(patient.getBloodgroup() != null)
            existingPatient.setBloodgroup(patient.getBloodgroup());
        if(patient.getRegistrationdate() != null)
            existingPatient.setRegistrationdate(patient.getRegistrationdate());
        return  existingPatient;
    }
}
