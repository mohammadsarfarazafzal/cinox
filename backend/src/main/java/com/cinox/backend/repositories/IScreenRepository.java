package com.cinox.backend.repositories;

import com.cinox.backend.entities.ScreenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IScreenRepository extends JpaRepository<ScreenEntity, Long> {
}
