package com.cinox.backend.services;

import com.cinox.backend.dto.TheaterDTO;
import com.cinox.backend.entities.TheaterEntity;
import com.cinox.backend.repositories.ITheaterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TheaterService implements ITheaterService{

    @Autowired
    private ITheaterRepository theaterRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Override
    public TheaterDTO addTheater(TheaterDTO theater) {
        TheaterEntity entity = mapper.map(theater, TheaterEntity.class);
        return mapper.map(theaterRepository.save(entity), TheaterDTO.class);
    }

    @Override
    public List<TheaterDTO> getAll() {
        List<TheaterEntity> entities = theaterRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, TheaterDTO.class)).collect(Collectors.toList());
    }

    @Override
    public TheaterDTO editTheater(TheaterDTO theater) {
        TheaterEntity entity = mapper.map(theater, TheaterEntity.class);
        if (entity.getId()!=null){
            return mapper.map(theaterRepository.save(entity), TheaterDTO.class);
        }
        return null;
    }

    @Override
    public String deleteTheater(Long id) {
        Optional<TheaterEntity> entity = theaterRepository.findById(id);
        if(entity.isPresent()){
            theaterRepository.delete(entity.get());
            return "Theater deleted.";
        }
        return "Theater does not exist with id: "+id;
    }

    @Override
    public TheaterDTO getTheaterById(Long id) {
        Optional<TheaterEntity> entity = theaterRepository.findById(id);
        if(entity.isPresent()){
            return mapper.map(entity.get(), TheaterDTO.class);
        }
        return null;
    }
}
