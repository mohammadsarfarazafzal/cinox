package com.cinox.backend.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "id"
)

public class MovieDTO {

    private Long id;
    
    @NotBlank(message = "Movie title is required")
    @Size(max = 100, message = "Movie title cannot exceed 100 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, message = "Description must be at least 10 characters")
    private String description;
    
    @NotBlank(message = "Genre is required")
    private String genre;
    
    @NotBlank(message = "Language is required")
    private String language;
    
    @NotNull(message = "Release date is required")
    private LocalDate releaseDate;
    
    @Min(value = 30, message = "Duration must be at least 30 minutes")
    private int durationMins;
    
    @NotBlank(message = "Director name is required")
    private String director;
    
    @NotBlank(message = "Cast information is required")
    private String cast;
    
    private String posterUrl;

    private String backdropUrl;
    
    private String trailerUrl;
    
    private boolean isActive = true;

    private List<ShowDTO> shows;
}