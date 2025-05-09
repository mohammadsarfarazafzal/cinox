package com.cinox.backend.services;

import com.cinox.backend.dto.BookingDTO;
import com.cinox.backend.entities.BookingEntity;
import com.cinox.backend.repositories.IBookingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService implements IBookingService{

    @Autowired
    private IBookingRepository bookingRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Override
    public BookingDTO addBooking(BookingDTO booking) {
        BookingEntity entity = mapper.map(booking, BookingEntity.class);
        return mapper.map(bookingRepository.save(entity), BookingDTO.class);
    }

    @Override
    public String deleteBooking(Long id) {
        Optional<BookingEntity> entity = bookingRepository.findById(id);
        if (entity.isPresent()){
            bookingRepository.delete(entity.get());
            return "Booking deleted, Non refundable.";
        }
        return "No booking found with id"+id;
    }

    @Override
    public List<BookingDTO> getAll() {
        List<BookingEntity> entities = bookingRepository.findAll();
        return entities.stream().map(entity -> mapper.map(entity, BookingDTO.class)).collect(Collectors.toList());
    }

    @Override
    public BookingDTO getBookingById(Long id) {
        Optional<BookingEntity> entity = bookingRepository.findById(id);
        if (entity.isPresent()){
            return mapper.map(entity.get(),BookingDTO.class);
        }
        return null;
    }

    @Override
    public BookingDTO getRazorpayOrderId(String id) {
        BookingEntity entity = bookingRepository.findByRazorpayOrderId(id);
        if (entity!=null){
            return mapper.map(entity,BookingDTO.class);
        }
        return null;
    }
}
