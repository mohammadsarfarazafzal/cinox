package com.cinox.backend.controllers;

import com.cinox.backend.dto.ScreenDTO;
import com.cinox.backend.services.IScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/screen")
public class ScreenController {

    @Autowired
    IScreenService screenService;

    @PostMapping(value = "add")
    public ScreenDTO addScreen(@RequestBody ScreenDTO screen){
        return screenService.addScreen(screen);
    }

    @GetMapping(value = "/")
    public List<ScreenDTO> getAll(){
        return screenService.getAll();
    }

    @PutMapping(value="edit")
    public ScreenDTO editScreen(@RequestBody ScreenDTO screen){
        return screenService.editScreen(screen);
    }

    @GetMapping(value = "/{id}")
    public ScreenDTO getScreenById(@PathVariable("id") Long id){
        return screenService.getScreenById(id);
    }

    @DeleteMapping(value = "delete/{id}")
    public String deleteScreen(@PathVariable("id") Long id){
        return screenService.deleteScreen(id);
    }

}
