package com.cinox.backend.repositories;

import com.cinox.backend.entities.ShowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShowRepository extends JpaRepository<ShowEntity, Long> {
}
