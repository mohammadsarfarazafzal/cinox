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

public class CityDTO {

    private Long id;
    
    @NotBlank(message = "City name is required")
    @Size(max = 50, message = "City name cannot exceed 50 characters")
    private String name;

    private List<TheaterDTO> theaters;
}