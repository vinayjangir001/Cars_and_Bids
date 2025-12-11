package com.example.auctionbids.repository;

import com.example.auctionbids.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findById(Long commentId);

    @Query("SELECT c.commentTextList From Comment c WHERE c.auction.id = :auctionId")
    List<String> findCommentTextListByAuctionId(Long auctionId);


}

