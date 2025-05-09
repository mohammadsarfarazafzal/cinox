package com.cinox.backend.services;

import com.cinox.backend.dto.ScreenDTO;

import java.util.List;

public interface IScreenService {
    public ScreenDTO addScreen(ScreenDTO screen);
    public List<ScreenDTO> getAll();
    public ScreenDTO editScreen(ScreenDTO screen);
    public String deleteScreen(Long id);
    public ScreenDTO getScreenById(Long id);
}
