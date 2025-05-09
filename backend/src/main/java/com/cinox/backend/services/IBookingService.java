package com.cinox.backend.services;

import com.cinox.backend.dto.BookingDTO;

import java.util.List;

public interface IBookingService {
    public BookingDTO addBooking(BookingDTO booking);
    public String deleteBooking(Long id);
    public List<BookingDTO> getAll();
    public BookingDTO getBookingById(Long id);
    public BookingDTO getRazorpayOrderId(String id);
}
