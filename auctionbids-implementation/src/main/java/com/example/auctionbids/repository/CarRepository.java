package com.example.auctionbids.repository;

import com.example.auctionbids.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // You can add custom query methods here if needed
}
