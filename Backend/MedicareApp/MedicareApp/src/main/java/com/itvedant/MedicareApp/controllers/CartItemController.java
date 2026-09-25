package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.CartItem;
import com.itvedant.MedicareApp.services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class CartItemController
{
    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/addtocart")
    public ResponseEntity<?> saveCartItem(@RequestBody CartItem cartItem) {
        return new ResponseEntity<>(cartItemService.addToCart(cartItem),
                HttpStatus.CREATED);
    }

    @GetMapping("/getAllCartItems")
    public ResponseEntity<?> getAllCartItem() {
        return new ResponseEntity<>(cartItemService.getAll(),
                HttpStatus.OK);
    }



    @DeleteMapping("/deleteCartItem/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        return new ResponseEntity<>(cartItemService.delete(id),
                HttpStatus.OK);
    }

    @PutMapping("/updatequantity/{id}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long id,
            @RequestParam int quantity) {
        return new ResponseEntity<>(cartItemService.updateQuantity(id, quantity),
                HttpStatus.OK);
    }
}
