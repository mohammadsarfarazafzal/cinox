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
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="screens")
public class ScreenEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="screenId")
    private Long id;
    
    @Column(nullable = false)
    private String screenName;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theater_id", nullable = false)
    private TheaterEntity theater;
    
    @Column(name = "total_seats", nullable = false)
    private int totalSeats;
    
    @Column(name = "gold_seats", nullable = false)
    private int goldSeats;
    
    @Column(name = "platinum_seats", nullable = false)
    private int platinumSeats;
    
    @Column(name = "silver_seats", nullable = false)
    private int silverSeats;
    
    @OneToMany(mappedBy = "screen")
    private List<ShowEntity> shows;
}