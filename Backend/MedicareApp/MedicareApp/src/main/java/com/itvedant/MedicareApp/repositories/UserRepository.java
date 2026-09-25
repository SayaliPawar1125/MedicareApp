package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
