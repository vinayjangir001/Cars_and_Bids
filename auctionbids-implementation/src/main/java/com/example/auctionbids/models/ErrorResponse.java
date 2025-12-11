package com.example.auctionbids.models;

import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String error;
    private String message;

    public ErrorResponse(int value, String bad_request, String s) {
    }

    public ErrorResponse() {

    }
}