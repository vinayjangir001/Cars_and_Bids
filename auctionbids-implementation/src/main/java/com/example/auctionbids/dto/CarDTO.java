package com.example.auctionbids.dto;

import lombok.Data;

@Data
public class CarDTO {
    private String carname;
    private String brand;
    private String model;
    private int year;
    private int mileage;
    private String color;
    private String transmissionType;
    private String bodyStyle;

    public CarDTO(String carname, String brand, String model, int year, int mileage, String color, String transmissionType, String bodyStyle) {
        this.carname = carname;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.color = color;
        this.transmissionType = transmissionType;
        this.bodyStyle = bodyStyle;
    }


}
