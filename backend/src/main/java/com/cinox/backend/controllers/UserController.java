package com.cinox.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/users")
public class UserController {

	@GetMapping
	public String test() {
		return "<center><h1>Application Running!</h1></center>";
	}
	
}
