package com.itvedant.MedicareApp.repositories;

import com.itvedant.MedicareApp.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository  extends JpaRepository<CartItem,Long> {
}
