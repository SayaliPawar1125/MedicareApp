package com.itvedant.MedicareApp.controllers;

import com.itvedant.MedicareApp.entities.Order;
import com.itvedant.MedicareApp.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vi")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/placeorder")
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        return new ResponseEntity<>(orderService.placeOrder(order),
                HttpStatus.CREATED);
    }

    @GetMapping("/getOrder/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.getOrderById(id),
                HttpStatus.OK);
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<?> getAllOrders() {
        return new ResponseEntity<>(orderService.getAllOrders(),
                HttpStatus.OK);
    }

    @DeleteMapping("/cancelorder/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.cancelOrder(id),
                HttpStatus.OK);
    }
}
