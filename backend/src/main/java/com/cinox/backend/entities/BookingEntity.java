package com.cinox.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="bookings")

public class BookingEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="booking_id")
    private Long id;

    // Many bookings → One user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    // Many bookings → One show
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id", nullable = false)
    private ShowEntity show;

    @Column(name = "seat_class", nullable = false)
    private String seatClass; // e.g. "Gold", "Platinum"

    @Column(name = "number_of_tickets", nullable = false)
    private int nTickets;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;
    
    @Column(name="seat_numbers", nullable=false)
    private List<String> seatNumbers;

    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    @PrePersist
    protected void onCreate() {
        bookingDate = LocalDateTime.now();
    }
	
}
