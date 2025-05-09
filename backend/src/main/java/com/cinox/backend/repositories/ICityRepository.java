package com.cinox.backend.repositories;

import com.cinox.backend.entities.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<CityEntity, Long> {
}
