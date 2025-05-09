package com.cinox.backend.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id"
)

public class ScreenDTO {

    private Long id;
    
    @NotBlank(message = "Screen name is required")
    @Size(max = 50, message = "Screen name cannot exceed 50 characters")
    private String screenName;
    
    @NotNull(message = "Theater is required")
    private TheaterDTO theater;
    
    @Min(value = 1, message = "Total seats must be at least 1")
    private int totalSeats;
    
    @Min(value = 0, message = "Gold seats cannot be negative")
    private int goldSeats;
    
    @Min(value = 0, message = "Platinum seats cannot be negative")
    private int platinumSeats;
    
    @Min(value = 0, message = "Silver seats cannot be negative")
    private int silverSeats;

    private List<ShowDTO> shows;
}