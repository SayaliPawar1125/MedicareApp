package com.itvedant.MedicareApp.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import javax.naming.Name;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private  Long id;
    private  Long  userid;
;;;;


    @Positive(message = "Total Amount Should be Above 0")
    private Double totalamount;

    @NotBlank(message = "status Should not be blank")
    private String status;

    @NotBlank(message = "Payment status Should not be blank")
    private String paymentstatus;

    @NotNull(message = "Created Should not be Blank")
    private LocalDateTime createdAt;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private CartItem cartItem;


}
