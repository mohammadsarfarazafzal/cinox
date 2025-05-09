package com.cinox.backend.services;

import com.cinox.backend.dto.CityDTO;
import com.cinox.backend.entities.CityEntity;
import com.cinox.backend.repositories.ICityRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CityService implements ICityService {

    @Autowired
    private ICityRepository cityRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Override
    public CityDTO addCity(CityDTO city) {
        CityEntity cityEntity = mapper.map(city, CityEntity.class);
        return mapper.map(cityRepository.save(cityEntity),CityDTO.class);
    }

    @Override
    public List<CityDTO> getAll() {
        List<CityEntity> entities = cityRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, CityDTO.class)).collect(Collectors.toList());
    }

    @Override
    public CityDTO editCity(CityDTO city) {
        CityEntity cityEntity = mapper.map(city, CityEntity.class);
        if (cityEntity.getId()!=null){
            return mapper.map(cityRepository.save(cityEntity),CityDTO.class);
        }
        return null;
    }

    @Override
    public CityDTO getCityById(Long id) {
        Optional<CityEntity> entity = cityRepository.findById(id);
        if(entity.isPresent()){
            return mapper.map(entity.get(), CityDTO.class);
        }
        return null;
    }

    @Override
    public String deleteCity(Long id) {
        Optional<CityEntity> entity = cityRepository.findById(id);
        if(entity.isPresent()){
            cityRepository.delete(entity.get());
            return "City deleted.";
        }
        return "Cit does not exist with id: "+id;
    }

}
