package com.cinox.backend.services;

import java.util.List;

import com.cinox.backend.dto.UserDTO;


public interface IUserService {
	public UserDTO registerUser(UserDTO user);
	public UserDTO updateUser(UserDTO user);
	public String deleteUser(Long id);
	public UserDTO getUserById(Long id);
	public List<UserDTO> getAll();
	public UserDTO validateUser(String email,String password);
}
