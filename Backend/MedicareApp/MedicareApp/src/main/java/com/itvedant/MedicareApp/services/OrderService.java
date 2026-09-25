package com.itvedant.MedicareApp.services;


import com.itvedant.MedicareApp.entities.Order;
import com.itvedant.MedicareApp.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

        @Autowired
        private OrderRepository orderRepository;

        public Order placeOrder(Order order) {
                if (order.getStatus() == null) {
                        order.setStatus("PLACED");
                }
                return orderRepository.save(order);
        }

        public Order getOrderById(Long id) {
                return orderRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Order Not Found"));
        }


        public List<Order> getAllOrders() {
                return orderRepository.findAll();
        }

        public Boolean cancelOrder(Long id) {
                orderRepository.deleteById(id);
                return true;
        }
}
