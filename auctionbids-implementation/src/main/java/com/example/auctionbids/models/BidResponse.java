package com.example.auctionbids.models;


import com.example.auctionbids.entity.Bid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidResponse {
    private String message;

    private Double amount;
    private LocalDateTime bidTime;
    private int totalBids;
    private double lastBidAmount;

    private Long auctionId;
    private Long userId;
}
