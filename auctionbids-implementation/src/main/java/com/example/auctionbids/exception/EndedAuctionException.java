package com.example.auctionbids.exception;

public class EndedAuctionException extends RuntimeException {
    public EndedAuctionException(String message) {
        super(message);
    }
}