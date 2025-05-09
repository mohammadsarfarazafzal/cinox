package com.cinox.backend.repositories;

import com.cinox.backend.entities.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookingRepository extends JpaRepository<BookingEntity, Long> {
    BookingEntity findByRazorpayOrderId(String razorpayOrderId);
}
