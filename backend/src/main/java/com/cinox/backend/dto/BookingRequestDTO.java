package com.cinox.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BookingRequestDTO {
    private String bookingDate;
    private double totalAmount;
    private Long userId;
    private Long showId;
    private String seatNumbers;
}
