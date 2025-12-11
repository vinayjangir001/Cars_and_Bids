package com.example.auctionbids.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String carName;
    private String brand;
    private String model;
    private int year;
    private double mileage;
    private String color;
    private String transmissionType;
    private String bodyStyle;


}
