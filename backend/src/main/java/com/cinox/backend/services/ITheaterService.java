package com.cinox.backend.services;

import com.cinox.backend.dto.TheaterDTO;

import java.util.List;

public interface ITheaterService {
    public TheaterDTO addTheater(TheaterDTO theater);
    public List<TheaterDTO> getAll();
    public TheaterDTO editTheater(TheaterDTO theater);
    public String deleteTheater(Long id);
    public TheaterDTO getTheaterById(Long id);
}
