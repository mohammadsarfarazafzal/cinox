package com.cinox.backend.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import com.cinox.backend.enums.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property  = "id"
)

public class UserDTO {

	private int id;
	
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
	
	private Gender gender;
	
	private MaritalStatus maritalStatus;
	
	private UserRole role = UserRole.USER;

	private List<BookingDTO> bookings;
}
