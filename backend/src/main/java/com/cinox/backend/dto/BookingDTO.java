package com.cinox.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BookingDTO {

    private Long id;

    @NotNull(message = "User is required")
    private UserDTO user;

    @NotNull(message = "Show is required")
    private ShowDTO show;

    @NotBlank(message = "Seat class is required")
    private String seatClass;

    @Min(value = 1, message = "Must book at least 1 ticket")
    private int nTickets;

    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;

    private LocalDateTime bookingDate;

    @NotBlank(message = "Seat is required")
    private List<String> seatNumbers;
}
