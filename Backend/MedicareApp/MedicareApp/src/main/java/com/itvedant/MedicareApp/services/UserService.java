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

        public User addUser(User user)
        {
            List<User> users = userRepository.findAll();
            for(User u : users)
            {
                if(u.getEmail().equalsIgnoreCase(user.getEmail()))
                {
                    throw new RuntimeException("User already registered with this email id");
                }
            }
            return userRepository.save(user);
        }

        public List<User> getAllUsers()
        {
            return userRepository.findAll();
        }

        public User updateUser(User user, Long id)
        {
            Optional<User> optUser = userRepository.findById(id);
            if (optUser.isPresent())
            {
                User existingUser = optUser.get();
                if (user.getName() != null) {
                    existingUser.setName(user.getName());
                }
                if (user.getEmail() != null) {
                    existingUser.setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    existingUser.setPassword(user.getPassword());
                }
                if (user.getPhone() != null) {
                    existingUser.setPhone(user.getPhone());
                }
                if (user.getRole() != null) {
                    existingUser.setRole(user.getRole());
                }
                if (user.getImage() != null) {
                    existingUser.setImage(user.getImage());

                }
                return userRepository.save(existingUser);
            }
            else
            {
                throw new RuntimeException("User does not exist with specified id");
            }
        }

        public List<User> getUserByRole(String role)
        {
            List<User> userlist = userRepository.findAll();
            List<User> userlistByRole = userlist.stream().filter
                    (u->u.getRole().equalsIgnoreCase(role)).toList();
            return userlistByRole;
        }



    }
