package com.itvedant.MedicareApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    private Long userid;

    private Integer quantity;


    // Many CartItems can belong to One Medicine
    @ManyToOne
    @JoinColumn(name = "med_id")
    private Medicine medicines;


    // Many CartItems belong to One Order
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order orders;
}
