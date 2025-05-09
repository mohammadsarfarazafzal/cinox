package com.cinox.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="movies")
public class MovieEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="movie_id")
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private String genre;
    
    @Column(nullable = false)
    private String language;
    
    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;
    
    @Column(name = "duration_mins", nullable = false)
    private int durationMins;
    
    @Column(nullable = false)
    private String director;
    
    @Column(nullable = false)
    private String cast;
    
    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "backdrop_url")
    private String backdropUrl;
    
    @Column(name = "trailer_url")
    private String trailerUrl;
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    @OneToMany(mappedBy = "movie")
    private List<ShowEntity> shows;
}