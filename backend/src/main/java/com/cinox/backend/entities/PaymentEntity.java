package com.cinox.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long id;

    @Column(name="razorpay_payment_id")
    private String razorpayPaymentId;

    @Column(name="amount")
    private double amount;

    @Column(name="status")
    private String status;

    @Column(name="paid_at")
    private LocalDateTime paidAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "booking_id")
    private BookingEntity booking;

}
