package com.cinox.backend.controllers;

import com.cinox.backend.dto.MovieDTO;
import com.cinox.backend.services.IMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    
    @Autowired
    IMovieService movieService;

    @PostMapping(value = "add")
    public MovieDTO addMovie(@RequestBody MovieDTO movie){
        return movieService.addMovie(movie);
    }

    @GetMapping(value = "/")
    public List<MovieDTO> getAll(){
        return movieService.getAll();
    }

    @PutMapping(value="edit")
    public MovieDTO editMovie(@RequestBody MovieDTO movie){
        return movieService.editMovie(movie);
    }

    @GetMapping(value = "/{id}")
    public MovieDTO getMovieById(@PathVariable("id") Long id){
        return movieService.getMovieById(id);
    }

    @DeleteMapping(value = "delete/{id}")
    public String deleteMovie(@PathVariable("id") Long id){
        return movieService.deleteMovie(id);
    }
    
}
