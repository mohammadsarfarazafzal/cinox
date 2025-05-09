package com.cinox.backend.repositories;

import com.cinox.backend.entities.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMovieRepository extends JpaRepository<MovieEntity, Long> {
}
