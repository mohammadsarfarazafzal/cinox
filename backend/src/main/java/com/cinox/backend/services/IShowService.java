package com.cinox.backend.services;

import com.cinox.backend.dto.ShowDTO;

import java.util.List;

public interface IShowService {
    public ShowDTO addShow(ShowDTO show);
    public List<ShowDTO> getAll();
    public ShowDTO editShow(ShowDTO show);
    public String deleteShow(Long id);
    public ShowDTO getShowById(Long id);
}
