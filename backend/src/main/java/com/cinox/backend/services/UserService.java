package com.cinox.backend.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinox.backend.dto.UserDTO;
import com.cinox.backend.entities.UserEntity;
import com.cinox.backend.repositories.IUserRepository;


import java.util.stream.Collectors;



@Service
public class UserService implements IUserService {
	@Autowired
	private IUserRepository userRepository;

	private final ModelMapper mapper = new ModelMapper();

	@Override
	public UserDTO registerUser(UserDTO user) {
		// TODO Auto-generated method stub
		UserEntity userEntity = mapper.map(user, UserEntity.class);
		return mapper.map(userRepository.save(userEntity), UserDTO.class);
	}
	@Override
	public UserDTO updateUser(UserDTO user) {
		// TODO Auto-generated method stub
		UserEntity userEntity = mapper.map(user, UserEntity.class);
		if (userEntity.getId()!=null){
			return mapper.map(userRepository.save(userEntity), UserDTO.class);
		}
		return null;
	}
	@Override
	public String deleteUser(Long id) {
		// TODO Auto-generated method stub
		Optional<UserEntity> user = userRepository.findById(id);
		if(user.isPresent()) {
			userRepository.delete(user.get());
			return "User is deleted Successfully";
		}
		return "User is not found with ID:"+ id;
	}
	@Override
	public UserDTO getUserById(Long id) {
		// TODO Auto-generated method stub
		Optional<UserEntity> user = userRepository.findById(id);
		if(user.isPresent()) {
			return mapper.map(user.get(), UserDTO.class);
		}
		return null;
	}
	@Override
	public List<UserDTO> getAll() {
		// TODO Auto-generated method stub
		List<UserEntity> entities = userRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, UserDTO.class)).collect(Collectors.toList());
	}
	@Override
	public UserDTO validateUser(String email, String password) {
		// TODO Auto-generated method stub
		UserEntity user = userRepository.findByEmail(email);
		if(user!=null)
		{
			if(user.getPassword().equals(password))
			{
				return mapper.map(user, UserDTO.class);
			}
		}
		return null;
	}
	
}
