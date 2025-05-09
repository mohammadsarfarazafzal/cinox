package com.cinox.backend.controllers;

import com.cinox.backend.dto.TheaterDTO;
import com.cinox.backend.services.ITheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theater")
public class TheaterController {

    @Autowired
    ITheaterService theaterService;

    @PostMapping(value = "add")
    public TheaterDTO addTheater(@RequestBody TheaterDTO theater){
        return theaterService.addTheater(theater);
    }

    @GetMapping(value = "/")
    public List<TheaterDTO> getAll(){
        return theaterService.getAll();
    }

    @PutMapping(value="edit")
    public TheaterDTO editTheater(@RequestBody TheaterDTO theater){
        return theaterService.editTheater(theater);
    }

    @GetMapping(value = "/{id}")
    public TheaterDTO getTheaterById(@PathVariable("id") Long id){
        return theaterService.getTheaterById(id);
    }

    @DeleteMapping(value = "delete/{id}")
    public String deleteTheater(@PathVariable("id") Long id){
        return theaterService.deleteTheater(id);
    }

}
