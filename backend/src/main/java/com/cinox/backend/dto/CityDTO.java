package com.cinox.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {

    private Long id;
    
    @NotBlank(message = "City name is required")
    @Size(max = 50, message = "City name cannot exceed 50 characters")
    private String name;
    
    @JsonIgnoreProperties("city") // To prevent infinite recursion
    private List<TheaterDTO> theaters;
}