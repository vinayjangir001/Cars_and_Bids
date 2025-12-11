package com.example.auctionbids.service;

import com.example.auctionbids.entity.Auction;
import com.example.auctionbids.entity.Comment;
import com.example.auctionbids.entity.User;
import com.example.auctionbids.enums.AuctionStatus;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.exception.MyFileNotFoundException;
import com.example.auctionbids.exception.UnauthorizedException;
import com.example.auctionbids.models.ErrorResponse;
import com.example.auctionbids.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    private final AuctionService auctionService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    public CommentService(CommentRepository commentRepository, AuctionService auctionService) {
        this.commentRepository = commentRepository;
        this.auctionService = auctionService;
    }

    public Comment createComment(Long auctionId, String commentText, Long userId) throws AuctionNotFoundException, MyFileNotFoundException, IllegalArgumentException  {

//        try {

            Auction auction = auctionService.getAuctionByID(auctionId);
            if (auction == null)
                throw new AuctionNotFoundException("Auction with ID " + auctionId + " not found");

            if (auction.getAuctionStatus() == AuctionStatus.ENDED) {
                throw new IllegalArgumentException("Cannot place a bid on a closed auction");
            }

            User user = customUserDetailService.getUserById(userId);
            if (user == null) {
                throw new MyFileNotFoundException("User with ID " + userId + " not found");
            }

            Comment comment = new Comment();
            comment.setAuction(auction);
            comment.setUser(user);

        List<String> commentTextList = comment.getCommentTextList();
        if (commentTextList == null) {
            commentTextList = new ArrayList<>();
        }

        // Add the new commentText to the list
        commentTextList.add(commentText);

        // Set the updated list back to the commentTextList property
        comment.setCommentTextList(commentTextList);

            comment.setCommentDate(new Date());

            return commentRepository.save(comment);

    }

        public Comment editComment (Long commentId, String newCommentText){
            Comment comment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new MyFileNotFoundException("Comment not found with ID: " + commentId));


            comment.setCommentTextList(Collections.singletonList(newCommentText));
            return commentRepository.save(comment);
        }

        public void deleteComment (Long commentId){
            Comment comment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new MyFileNotFoundException("Comment not found with ID: " + commentId));


            commentRepository.delete(comment);
        }

        public List<String> getAllCommentTextListByAuctionId(Long auctionId)
        {
            return commentRepository.findCommentTextListByAuctionId(auctionId);
        }
    }


