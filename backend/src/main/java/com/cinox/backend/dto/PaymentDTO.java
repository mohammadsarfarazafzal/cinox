package com.cinox.backend.dto;

import com.cinox.backend.entities.BookingEntity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id"
)

public class PaymentDTO {

    private Long id;

    @NotBlank(message = "Required")
    private String razorpayPaymentId;

    @NotNull(message = "Required")
    private double amount;

    @NotBlank(message = "Required")
    private String status;

    @NotNull(message = "Required")
    private LocalDateTime paidAt = LocalDateTime.now();

    @NotNull(message = "Booking is required")
    private BookingDTO booking;

}
