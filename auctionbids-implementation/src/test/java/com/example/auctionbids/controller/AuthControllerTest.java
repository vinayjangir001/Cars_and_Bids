package com.example.auctionbids.controller;

import com.example.auctionbids.entity.User;
import com.example.auctionbids.models.JwtRequest;
import com.example.auctionbids.models.JwtResponse;
import com.example.auctionbids.repository.UserRepository;
import com.example.auctionbids.security.JwtHelper;
import com.example.auctionbids.service.CustomUserDetailService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private CustomUserDetailService customUserDetailService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtHelper jwtHelper;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_SuccessfulAuthentication() throws Exception {
        // Mock login request
        JwtRequest jwtRequest = new JwtRequest();
        jwtRequest.setEmail("testuser@example.com");
        jwtRequest.setPassword("testpassword");

        // Mock authentication manager behavior
        Authentication authentication = new UsernamePasswordAuthenticationToken("testuser@example.com", "testpassword");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        // Mock customUserDetailService behavior
        when(customUserDetailService.loadUserByUsername(jwtRequest.getEmail())).thenReturn(mock(UserDetails.class));

        // Mock jwtHelper behavior
        when(jwtHelper.generateToken(any(UserDetails.class))).thenReturn("generatedToken");

        // Call the method to be tested
        ResponseEntity<?> responseEntity = authController.login(jwtRequest);

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("generatedToken", ((JwtResponse) responseEntity.getBody()).getToken());
    }

    @Test
    void testLogin_InvalidCredentials() throws Exception {
        // Mock login request
        JwtRequest jwtRequest = new JwtRequest();
        jwtRequest.setEmail("testuser@example.com");
        jwtRequest.setPassword("wrongpassword");

        // Mock authentication manager behavior to throw BadCredentialsException
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(BadCredentialsException.class);

        // Call the method to be tested and expect an exception
        assertThrows(Exception.class, () -> authController.login(jwtRequest));
    }

    @Test
    void testCreateUser() {
        // Mock user data
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("testpassword");

        // Call the method to be tested (since the method is void, just call it without 'when')
        authController.createuser(user);

        // Assertions
        // Verify that the customUserDetailService.createUser() method is called with the correct user object
        verify(customUserDetailService).createUser(user);
    }

    @Test
    void testGetUsers() {
        // Mock user data
        List<User> userList = new ArrayList<>();
        userList.add(new User());
        when(customUserDetailService.getUsers()).thenReturn(userList);

        // Call the method to be tested
        List<User> result = authController.getUser();

        // Assertions
        Assertions.assertEquals(userList.size(), result.size());
    }

    @Test
    void testGetLoggedInUser() {
        // Mock Principal object
        Principal principal = mock(Principal.class);
        when(principal.getName()).thenReturn("testuser");

        // Call the method to be tested
        String username = authController.getLoggedInUser(principal);

        // Assertions
        Assertions.assertEquals("testuser", username);
    }
}
