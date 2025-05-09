package com.cinox.backend.services;

import com.cinox.backend.dto.MovieDTO;

import java.util.List;

public interface IMovieService {
    public MovieDTO addMovie(MovieDTO movie);
    public List<MovieDTO> getAll();
    public MovieDTO editMovie(MovieDTO movie);
    public String deleteMovie(Long id);
    public MovieDTO getMovieById(Long id);
}
