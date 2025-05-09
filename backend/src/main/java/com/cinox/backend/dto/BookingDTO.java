package com.cinox.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id"
)

public class BookingDTO {

    private Long id;

    @NotNull(message = "User is required")
    private UserDTO user;

    @NotNull(message = "Show is required")
    private ShowDTO show;

    @NotBlank(message = "Payment is required")
    private String razorpayOrderId;

    @NotNull(message = "Total amount is required")
    private double totalAmount;

    private String bookingDate;

    private LocalDateTime createdAt = LocalDateTime.now();

    @NotBlank(message = "Seat is required")
    private String seatNumbers;

    private String status = "Processing";

}
