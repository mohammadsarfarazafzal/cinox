package com.cinox.backend.controllers;

import com.cinox.backend.dto.ShowDTO;
import com.cinox.backend.services.IShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/show")
public class ShowController {

    @Autowired
    IShowService showService;

    @PostMapping(value = "add")
    public ShowDTO addShow(@RequestBody ShowDTO show){
        return showService.addShow(show);
    }

    @GetMapping(value = "/")
    public List<ShowDTO> getAll(){
        return showService.getAll();
    }

    @PutMapping(value="edit")
    public ShowDTO editShow(@RequestBody ShowDTO show){
        return showService.editShow(show);
    }

    @GetMapping(value = "/{id}")
    public ShowDTO getShowById(@PathVariable("id") Long id){
        return showService.getShowById(id);
    }

    @DeleteMapping(value = "delete/{id}")
    public String deleteShow(@PathVariable("id") Long id){
        return showService.deleteShow(id);
    }

}
