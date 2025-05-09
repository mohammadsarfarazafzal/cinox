package com.cinox.backend.services;

import com.cinox.backend.dto.CityDTO;

import java.util.List;

public interface ICityService {
    public CityDTO addCity(CityDTO city);
    public List<CityDTO> getAll();
    public CityDTO editCity(CityDTO city);
    public String deleteCity(Long id);
    public CityDTO getCityById(Long id);
}
