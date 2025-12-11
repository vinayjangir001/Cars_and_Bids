package com.example.auctionbids.repository;

import com.example.auctionbids.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}