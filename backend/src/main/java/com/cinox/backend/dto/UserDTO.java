package com.cinox.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {

	private Long id;
	
	@NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name cannot exceed 100 characters")
	private String fullName;
	
	@NotBlank(message = "Username is required")
    @Size(min = 4, max = 20, message = "Username must be between 4-20 characters")
	private String username;
	
	@Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
	private String email;
	
	@Pattern(regexp = "^\\+?[0-9]{10,13}$", message = "Invalid phone number format")
	private String phoneNumber;
	
	@NotNull(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
	private String password;
	
	@Past(message = "Date of birth must be in the past")
	private LocalDate dob;
	
	private enum Gender{
		male, female
	}
	private Gender gender;
	
	private enum Marital{
		married, unmarried
	}
	private Marital maritalStatus;
	
	private enum Role{
		user, admin
	}
	private Role role;
	
	@JsonIgnoreProperties("user") // To prevent infinite recursion
	private List<BookingDTO> bookings;
}
