package com.cinox.backend.entities;

import java.time.LocalDate;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.cinox.backend.enums.Gender;
import com.cinox.backend.enums.MaritalStatus;
import com.cinox.backend.enums.UserRole;

@Entity
@Table(name="users")

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private Long id;
	
	@Column(nullable=false, length=100)
	private String fullName;
	
	@Column(unique = true, nullable = false, length = 20)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(length = 13, nullable = false)
    private String phoneNumber;
    
    @Column(nullable=false)
	private LocalDate dob;
    
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Enumerated(EnumType.STRING)
	private MaritalStatus maritalStatus;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	private UserRole role = UserRole.USER;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<BookingEntity> bookings;
	
}
