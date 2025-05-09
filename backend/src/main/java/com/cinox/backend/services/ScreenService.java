package com.cinox.backend.services;

import com.cinox.backend.dto.ScreenDTO;
import com.cinox.backend.entities.ScreenEntity;
import com.cinox.backend.repositories.IScreenRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Service
public class ScreenService implements IScreenService{
    @Autowired
    private IScreenRepository screenRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Override
    public ScreenDTO addScreen(ScreenDTO screen) {
        ScreenEntity entity = mapper.map(screen, ScreenEntity.class);
        return mapper.map(screenRepository.save(entity), ScreenDTO.class);
    }

    @Override
    public List<ScreenDTO> getAll() {
        List<ScreenEntity> entities = screenRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, ScreenDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ScreenDTO editScreen(ScreenDTO screen) {
        ScreenEntity entity = mapper.map(screen, ScreenEntity.class);
        if (entity.getId()!=null){
            return mapper.map(screenRepository.save(entity), ScreenDTO.class);
        }
        return null;
    }

    @Override
    public String deleteScreen(Long id) {
        Optional<ScreenEntity> entity = screenRepository.findById(id);
        if (entity.isPresent()){
            screenRepository.delete(entity.get());
            return "Screen Deleted";
        }
        return "Screen not found with id: "+id;
    }

    @Override
    public ScreenDTO getScreenById(Long id) {
        Optional<ScreenEntity> entity = screenRepository.findById(id);
        if (entity.isPresent()){
            return mapper.map(entity.get(),ScreenDTO.class);
        }
        return null;
    }
}
