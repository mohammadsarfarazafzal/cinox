package com.cinox.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinox.backend.entities.UserEntity;

@Repository
public interface IUserRepository extends JpaRepository<UserEntity, Long> {
	public UserEntity findByEmail(String email);
}
