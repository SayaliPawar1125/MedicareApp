package com.itvedant.MedicareApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    private Long userid;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "med_id")
    private Medicine medicines;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order orders;
}