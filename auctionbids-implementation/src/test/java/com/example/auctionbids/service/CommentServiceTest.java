
package com.example.auctionbids.service;
import com.example.auctionbids.entity.Auction;
import com.example.auctionbids.entity.Comment;
import com.example.auctionbids.entity.User;
import com.example.auctionbids.enums.AuctionStatus;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.exception.MyFileNotFoundException;
import com.example.auctionbids.repository.CommentRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private AuctionService auctionService;

    @Mock
    private CustomUserDetailService customUserDetailService;

    @InjectMocks
    private CommentService commentService;


    @Test(expected = AuctionNotFoundException.class)
    public void testCreateCommentAuctionNotFound() throws AuctionNotFoundException, MyFileNotFoundException, IllegalArgumentException {
        // Test data
        Long auctionId = 1L;
        String commentText = "Test comment";
        Long userId = 2L;

        when(auctionService.getAuctionByID(auctionId)).thenReturn(null);

        // Perform the test (expecting AuctionNotFoundException)
        commentService.createComment(auctionId, commentText, userId);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateCommentAuctionEnded() throws AuctionNotFoundException, MyFileNotFoundException, IllegalArgumentException {
        // Test data
        Long auctionId = 1L;
        String commentText = "Test comment";
        Long userId = 2L;

        Auction auction = new Auction();
        auction.setAuctionId(auctionId);
        auction.setAuctionStatus(AuctionStatus.ENDED);

        when(auctionService.getAuctionByID(auctionId)).thenReturn(auction);

        // Perform the test (expecting IllegalArgumentException)
        commentService.createComment(auctionId, commentText, userId);
    }



    @Test
    public void testEditComment() {
        // Test data
        Long commentId = 1L;
        String newCommentText = "Updated comment text";

        Comment comment = new Comment();
        comment.setId(commentId);
        comment.setCommentTextList(Collections.singletonList("Old comment text"));

        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        // Perform the test
        Comment updatedComment = commentService.editComment(commentId, newCommentText);

        // Assertions
        assertNotNull(updatedComment);
        assertEquals(newCommentText, updatedComment.getCommentTextList().get(0));

        verify(commentRepository).findById(commentId);
        verify(commentRepository).save(any(Comment.class));
    }

    @Test(expected = MyFileNotFoundException.class)
    public void testEditCommentNotFound() {
        // Test data
        Long commentId = 1L;
        String newCommentText = "Updated comment text";

        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // Perform the test (expecting MyFileNotFoundException)
        commentService.editComment(commentId, newCommentText);
    }

    @Test
    public void testDeleteComment() {
        // Test data
        Long commentId = 1L;

        Comment comment = new Comment();
        comment.setId(commentId);

        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));

        // Perform the test
        commentService.deleteComment(commentId);

        // Verify that the delete method is called
        verify(commentRepository).delete(comment);
    }

    @Test(expected = MyFileNotFoundException.class)
    public void testDeleteCommentNotFound() {
        // Test data
        Long commentId = 1L;

        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // Perform the test (expecting MyFileNotFoundException)
        commentService.deleteComment(commentId);
    }
}
