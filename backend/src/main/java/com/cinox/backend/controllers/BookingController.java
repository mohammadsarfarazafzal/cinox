package com.cinox.backend.controllers;

import com.cinox.backend.dto.BookingDTO;
import com.cinox.backend.dto.BookingRequestDTO;
import com.cinox.backend.dto.UserDTO;
import com.cinox.backend.services.IBookingService;
import com.cinox.backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    IBookingService bookingService;

    @Autowired
    IUserService userService;

    @GetMapping(value="/")
    public List<BookingDTO> getAll()
    {
        return bookingService.getAll();
    }

    @GetMapping(value="{id}")
    public BookingDTO getBookingById(@PathVariable("id") long id)
    {
        return bookingService.getBookingById(id);
    }

    @PostMapping(value="add")
    public BookingDTO addBooking(@RequestBody BookingDTO booking)
    {
        return bookingService.addBooking(booking);
    }

    @DeleteMapping(value="delete/{id}")
    public String deleteBooking(@PathVariable("id") Long id)
    {
        return bookingService.deleteBooking(id);
    }

    @PostMapping("confirm")
    public ResponseEntity<BookingDTO> confirmBooking(@RequestBody BookingRequestDTO bookingRequest) {
        System.out.println("User Id: "+bookingRequest.getUserId());
        Long userid = bookingRequest.getUserId();
        UserDTO user = userService.getUserById(userid);
        BookingDTO booking = new BookingDTO();
        if(user==null)
        {
            return ResponseEntity.ok(booking);
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
        String formattedDate = booking.getCreatedAt().format(formatter);
        booking.setBookingDate(formattedDate);
        booking.setTotalAmount(bookingRequest.getTotalAmount());
        System.out.println("Booking Date "+booking.getBookingDate().toString());
        booking.setUser(user);
        bookingService.addBooking(booking);
        return ResponseEntity.ok(booking);
    }

}
