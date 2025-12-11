package com.example.auctionbids.models;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class BidRequest {
    private Double amount;
//    private Date bidTime;
//    private int totalBids;
//    private double lastBidAmount;

//, Date bidTime, int totalBids, Double lastBidAmount

    public BidRequest(Double amount) {
        this.amount = amount;
//        this.bidTime = bidTime;
//        this.totalBids = totalBids;
//        this.lastBidAmount = lastBidAmount;
    }

    public BidRequest() {

    }
}
