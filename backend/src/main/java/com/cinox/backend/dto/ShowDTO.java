package com.cinox.backend.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id"
)

public class ShowDTO {

    private Long id;
    
    @NotNull(message = "Movie is required")
    private MovieDTO movie;
    
    @NotNull(message = "Screen is required")
    private ScreenDTO screen;
    
    @NotNull(message = "Show time is required")
    private LocalDateTime showTime;
    
    @NotNull(message = "End time is required")
    private LocalDateTime endTime;
    
    @NotNull(message = "Gold price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Gold price must be greater than 0")
    private double goldPrice;
    
    @NotNull(message = "Platinum price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Platinum price must be greater than 0")
    private double platinumPrice;
    
    @NotNull(message = "Silver price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Silver price must be greater than 0")
    private double silverPrice;
    
    private boolean isActive = true;

    private List<BookingDTO> bookings;
}