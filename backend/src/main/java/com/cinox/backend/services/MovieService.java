package com.cinox.backend.services;

import com.cinox.backend.dto.MovieDTO;
import com.cinox.backend.entities.MovieEntity;
import com.cinox.backend.repositories.IMovieRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService implements IMovieService{

    @Autowired
    private IMovieRepository movieRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Override
    public MovieDTO addMovie(MovieDTO movie) {
        MovieEntity entity = mapper.map(movie, MovieEntity.class);
        return mapper.map(movieRepository.save(entity), MovieDTO.class);
    }

    @Override
    public List<MovieDTO> getAll() {
        List<MovieEntity> entities = movieRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, MovieDTO.class)).collect(Collectors.toList());
    }

    @Override
    public MovieDTO editMovie(MovieDTO movie) {
        MovieEntity entity = mapper.map(movie, MovieEntity.class);
        if (entity.getId()!=null){
            return mapper.map(movieRepository.save(entity), MovieDTO.class);
        }
        return null;
    }

    @Override
    public String deleteMovie(Long id) {
        Optional<MovieEntity> entity = movieRepository.findById(id);
        if (entity.isPresent()){
            movieRepository.delete(entity.get());
            return "Movie Deleted";
        }
        return "Movie not found with id: "+id;
    }

    @Override
    public MovieDTO getMovieById(Long id) {
        Optional<MovieEntity> entity = movieRepository.findById(id);
        if (entity.isPresent()){
            return mapper.map(entity.get(),MovieDTO.class);
        }
        return null;
    }
}
