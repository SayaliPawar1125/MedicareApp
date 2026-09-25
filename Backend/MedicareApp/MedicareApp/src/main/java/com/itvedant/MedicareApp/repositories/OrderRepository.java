package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
