package com.cinox.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private BigDecimal goldPrice;
    
    @NotNull(message = "Platinum price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Platinum price must be greater than 0")
    private BigDecimal platinumPrice;
    
    @NotNull(message = "Silver price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Silver price must be greater than 0")
    private BigDecimal silverPrice;
    
    private boolean isActive = true;
    
    @JsonIgnoreProperties("show") // To prevent infinite recursion
    private List<BookingDTO> bookings;
}