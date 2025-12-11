package com.example.auctionbids.repository;

import com.example.auctionbids.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository  extends CrudRepository<User, Long>
{

    User findByEmail(String username);
}
