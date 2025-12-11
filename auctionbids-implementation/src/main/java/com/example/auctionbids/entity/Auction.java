package com.example.auctionbids.entity;

import com.example.auctionbids.enums.AuctionStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auctionId;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id",referencedColumnName = "id")
    private Car car;

//    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Bid> bids = new ArrayList<>();

    // Other attributes and methods in the Auction entity

//    @Column(nullable = false)
    private int totalBids;

//    @Column(nullable = false)
    private double lastBidAmount;


    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private AuctionStatus auctionStatus;



    private Set<String> carImages;

    // Constructors, getters, and setters
}