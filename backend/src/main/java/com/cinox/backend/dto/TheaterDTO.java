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

public class TheaterDTO {

    private Long id;
    
    @NotBlank(message = "Theater name is required")
    @Size(max = 100, message = "Theater name cannot exceed 100 characters")
    private String name;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @Pattern(regexp = "^\\+?[0-9]{10,13}$", message = "Invalid contact number format")
    @NotBlank(message = "Contact number is required")
    private String contactNumber;
    
    @NotNull(message = "City is required")
    private CityDTO city;
    
    @Min(value = 1, message = "Total screens must be at least 1")
    private int totalScreens;
    
    private String theaterPhotoUrl;

    private List<ScreenDTO> screens;
}