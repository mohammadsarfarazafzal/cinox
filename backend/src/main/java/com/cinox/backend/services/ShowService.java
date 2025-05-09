package com.cinox.backend.services;

import com.cinox.backend.dto.ShowDTO;
import com.cinox.backend.entities.ShowEntity;
import com.cinox.backend.repositories.IShowRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShowService implements IShowService{

    @Autowired
    private IShowRepository showRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Override
    public ShowDTO addShow(ShowDTO show) {
        ShowEntity entity = mapper.map(show, ShowEntity.class);
        return mapper.map(showRepository.save(entity), ShowDTO.class);
    }

    @Override
    public List<ShowDTO> getAll() {
        List<ShowEntity> entities = showRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, ShowDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ShowDTO editShow(ShowDTO show) {
        ShowEntity entity = mapper.map(show, ShowEntity.class);
        if (entity.getId()!=null){
            return mapper.map(showRepository.save(entity), ShowDTO.class);
        }
        return null;
    }

    @Override
    public String deleteShow(Long id) {
        Optional<ShowEntity> entity = showRepository.findById(id);
        if (entity.isPresent()){
            showRepository.delete(entity.get());
            return "Show Deleted";
        }
        return "Show not found with id: "+id;
    }

    @Override
    public ShowDTO getShowById(Long id) {
        Optional<ShowEntity> entity = showRepository.findById(id);
        if (entity.isPresent()){
            return mapper.map(entity.get(),ShowDTO.class);
        }
        return null;
    }
}
