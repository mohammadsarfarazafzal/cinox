package com.cinox.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


import com.cinox.backend.dto.UserDTO;
import com.cinox.backend.services.IUserService;


@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	IUserService userService;
	
	@PostMapping(value="register")
	public UserDTO userRegister(@RequestBody UserDTO user)
	{
		return userService.registerUser(user);
	}
	
	@PostMapping(value="login")
	public UserDTO userLogin(@RequestParam("email") String email,
			@RequestParam("password") String password)
	{
		return userService.validateUser(email, password);
	}
	
	@GetMapping(value="/{id}")
	public UserDTO getUsersById(@PathVariable("id") Long id)
	{
		return userService.getUserById(id);
	}
	
	@GetMapping(value="/")
	public List<UserDTO> getAllUsers()
	{
		return userService.getAll();
	}
	
	@DeleteMapping(value="delete/{id}")
	public String userDelete(@PathVariable("id") Long id)
	{
		return userService.deleteUser(id);
	}
	
	@PutMapping(value="edit")
	public UserDTO userEdit(@RequestBody UserDTO user)
	{
		return userService.updateUser(user);
	}
	
}
