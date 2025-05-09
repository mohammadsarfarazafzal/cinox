package com.cinox.backend.controllers;

import com.cinox.backend.dto.CityDTO;
import com.cinox.backend.services.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/city")
public class CityController {

    @Autowired
    ICityService cityService;

    @PostMapping(value = "add")
    public CityDTO addCity(@RequestBody CityDTO city){
        return cityService.addCity(city);
    }

    @GetMapping(value = "/")
    public List<CityDTO> getAll(){
        return cityService.getAll();
    }

    @PutMapping(value="edit")
    public CityDTO editCity(@RequestBody CityDTO city){
        return cityService.editCity(city);
    }

    @GetMapping(value = "/{id}")
    public CityDTO getCityById(@PathVariable("id") Long id){
        return cityService.getCityById(id);
    }

    @DeleteMapping(value = "delete/{id}")
    public String deleteCity(@PathVariable("id") Long id){
        return cityService.deleteCity(id);
    }

}
