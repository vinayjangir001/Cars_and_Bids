
package com.example.auctionbids.controller;

import com.example.auctionbids.entity.Comment;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.models.CommentRequest;
import com.example.auctionbids.service.CommentService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    @Test
    public void testCreateComment() throws AuctionNotFoundException {
        // Test data
        Long auctionId = 1L;
        Long userId = 2L;
        String commentText = "Test comment";

        CommentRequest commentRequest = new CommentRequest();
        commentRequest.setCommentText(commentText);

        Comment createdComment = new Comment();
        createdComment.setId(1L);
        createdComment.setCommentTextList(Collections.singletonList(commentText));

        when(commentService.createComment(auctionId, commentText, userId)).thenReturn(createdComment);

        // Perform the test
        ResponseEntity<Comment> responseEntity = commentController.createComment(auctionId, commentRequest, userId);

        // Assertions
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(createdComment, responseEntity.getBody());

        verify(commentService).createComment(auctionId, commentText, userId);
    }

    @Test
    public void testEditComment() {
        // Test data
        Long commentId = 1L;
        String newCommentText = "Updated comment text";

        CommentRequest commentRequest = new CommentRequest();
        commentRequest.setCommentText(newCommentText);

        Comment updatedComment = new Comment();
        updatedComment.setId(commentId);
        updatedComment.setCommentTextList(Collections.singletonList(newCommentText));

        when(commentService.editComment(commentId, newCommentText)).thenReturn(updatedComment);

        // Perform the test
        ResponseEntity<Comment> responseEntity = commentController.editComment(commentId, commentRequest);

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(updatedComment, responseEntity.getBody());

        verify(commentService).editComment(commentId, newCommentText);
    }

    @Test
    public void testDeleteComment() {
        // Test data
        Long commentId = 1L;

        // Perform the test
        ResponseEntity<Void> responseEntity = commentController.deleteComment(commentId);

        // Assertions
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());

        verify(commentService).deleteComment(commentId);
    }
}