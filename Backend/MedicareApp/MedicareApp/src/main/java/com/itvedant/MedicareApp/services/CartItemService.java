package com.itvedant.MedicareApp.services;

import com.itvedant.MedicareApp.entities.CartItem;
import com.itvedant.MedicareApp.repositories.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartItem addToCart(CartItem cartItem) {

        if (cartItem.getMedicines() == null ||
                cartItem.getMedicines().getId() == null) {

            throw new RuntimeException("Medicine ID is required");
        }

        List<CartItem> cartItemList = cartItemRepository.findAll();

        for (CartItem c : cartItemList) {

            if (c.getUserid().equals(cartItem.getUserid())
                    && c.getMedicines() != null
                    && c.getMedicines().getId().equals(
                    cartItem.getMedicines().getId())) {

                c.setQuantity(c.getQuantity() + cartItem.getQuantity());

                return cartItemRepository.save(c);
            }
        }

        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getAll() {
        return cartItemRepository.findAll();
    }

    public Boolean delete(Long id) {
        cartItemRepository.deleteById(id);
        return true;
    }

    public CartItem updateQuantity(Long id, int quantity) {

        Optional<CartItem> OptCartItem =
                cartItemRepository.findById(id);

        if (OptCartItem.isPresent()) {

            CartItem existingCartItem = OptCartItem.get();

            existingCartItem.setQuantity(quantity);

            return cartItemRepository.save(existingCartItem);

        } else {

            throw new RuntimeException("Cart Item Not Found");
        }
    }
}