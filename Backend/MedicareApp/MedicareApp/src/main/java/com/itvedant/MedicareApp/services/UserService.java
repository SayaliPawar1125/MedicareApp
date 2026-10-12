package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.User;
import com.itvedant.MedicareApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    // ADD USER
    public User addUser(User user) {

        return userRepository.save(user);
    }


    // GET ALL USERS
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }


    // GET USER BY ID
    public User getUserById(Long id) {

        Optional<User> optUser =
                userRepository.findById(id);

        if (optUser.isPresent()) {
            return optUser.get();
        }

        return null;
    }


    // UPDATE USER
    public User updateUser(User user, Long id) {

        Optional<User> optUser =
                userRepository.findById(id);

        if (optUser.isEmpty()) {
            return null;
        }

        User existingUser = optUser.get();


        if (user.getFirstname() != null) {
            existingUser.setFirstname(
                    user.getFirstname()
            );
        }

        if (user.getLastname() != null) {
            existingUser.setLastname(
                    user.getLastname()
            );
        }

        if (user.getEmail() != null) {
            existingUser.setEmail(
                    user.getEmail()
            );
        }

        if (user.getPhone() != null) {
            existingUser.setPhone(
                    user.getPhone()
            );
        }

        if (user.getDateOfBirth() != null) {
            existingUser.setDateOfBirth(
                    user.getDateOfBirth()
            );
        }

        if (user.getGender() != null) {
            existingUser.setGender(
                    user.getGender()
            );
        }

        if (user.getAddress() != null) {
            existingUser.setAddress(
                    user.getAddress()
            );
        }

        if (user.getImage() != null) {
            existingUser.setImage(
                    user.getImage()
            );
        }


        // Do NOT allow profile update to change role
        // Role should be controlled by backend.

        return userRepository.save(existingUser);
    }


    // GET USERS BY ROLE
    public List<User> getUserByRole(String role) {

        return userRepository
                .findAll()
                .stream()
                .filter(user ->
                        user.getRole() != null &&
                                user.getRole().equalsIgnoreCase(role)
                )
                .toList();
    }
};