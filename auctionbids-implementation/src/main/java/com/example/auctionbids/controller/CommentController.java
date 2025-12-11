package com.example.auctionbids.controller;

import com.example.auctionbids.entity.Comment;
import com.example.auctionbids.entity.User;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.models.CommentRequest;
import com.example.auctionbids.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/auctions/{auctionId}/user/{userId}")
    public ResponseEntity<Comment> createComment(
            @PathVariable Long auctionId,
            @RequestBody CommentRequest commentRequest,
            @PathVariable Long userId) throws AuctionNotFoundException {

        Comment newComment = commentService.createComment(auctionId, commentRequest.getCommentText(), userId);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> editComment(
            @PathVariable Long commentId,
            @RequestBody CommentRequest commentRequest) {

        Comment updatedComment = commentService.editComment(commentId, commentRequest.getCommentText());
        return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId) {

        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/auctions/{auctionId}")
        public List<String> getCommentTextListByAuctionId(@PathVariable Long auctionId)
        {
            return commentService.getAllCommentTextListByAuctionId(auctionId);
        }



    // Other API endpoints as needed
}