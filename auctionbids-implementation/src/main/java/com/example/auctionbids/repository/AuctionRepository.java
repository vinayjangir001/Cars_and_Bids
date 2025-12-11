package com.example.auctionbids.repository;

import com.example.auctionbids.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long>
{
    Optional<Auction> findById(Long id);



}
