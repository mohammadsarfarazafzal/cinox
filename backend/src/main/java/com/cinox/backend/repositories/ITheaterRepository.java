package com.cinox.backend.repositories;

import com.cinox.backend.entities.TheaterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITheaterRepository extends JpaRepository<TheaterEntity, Long> {
}
