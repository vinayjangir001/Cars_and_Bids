package com.example.auctionbids.exception;

public class AuctionNotFoundException extends RuntimeException  {
    public AuctionNotFoundException(String message) {
        super(message);
    }

    public AuctionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}