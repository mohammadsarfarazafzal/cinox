package com.cinox.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="shows")
public class ShowEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="showId")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private MovieEntity movie;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    private ScreenEntity screen;
    
    @Column(name = "show_time", nullable = false)
    private LocalDateTime showTime;
    
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;
    
    @Column(name = "gold_price", nullable = false)
    private double goldPrice;
    
    @Column(name = "platinum_price", nullable = false)
    private double platinumPrice;
    
    @Column(name = "silver_price", nullable = false)
    private double silverPrice;
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    @OneToMany(mappedBy = "show")
    private List<BookingEntity> bookings;
}