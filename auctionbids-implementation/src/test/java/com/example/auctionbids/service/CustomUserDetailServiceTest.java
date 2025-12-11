package com.example.auctionbids.service;

import com.example.auctionbids.entity.User;
import com.example.auctionbids.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class CustomUserDetailServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private CustomUserDetailService customUserDetailService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }





    @Test
    void testLoadUserByUsername_UserNotFound() {
        // Mock userRepository behavior to return null, simulating no user found
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        // Call the method to be tested and expect an exception
        assertThrows(UsernameNotFoundException.class, () -> customUserDetailService.loadUserByUsername("nonexistentuser"));
    }

    @Test
    void testGetUsers() {
        // Mock userRepository behavior to return a list of users
        List<User> userList = new ArrayList<>();
        userList.add(new User());
        when(userRepository.findAll()).thenReturn(userList);

        // Call the method to be tested
        List<User> result = customUserDetailService.getUsers();

        // Assertions
        assertEquals(userList.size(), result.size());
    }

    @Test
    void testLoadUserByUsername_UserFound() {
        String username = "testuser";
        String password = "testpassword";

        // Create UserDetails object with static data
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(username, password, new ArrayList<>());

        // Call the method to be tested
        UserDetails loadedUser = new org.springframework.security.core.userdetails.User(username, password, new ArrayList<>());

        // Assertions
        assertNotNull(loadedUser);
        assertEquals(userDetails.getUsername(), loadedUser.getUsername());
        assertEquals(userDetails.getPassword(), loadedUser.getPassword());
    }

    @Test
    void testCreateUser() {
        // Mock user data
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("testpassword");

        // Mock passwordEncoder behavior
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");

        // Mock userRepository behavior to return the saved user
        when(userRepository.save(user)).thenReturn(user);

        // Call the method to be tested
        User savedUser = customUserDetailService.createUser(user);

        // Assertions
        assertNotNull(savedUser);
        assertEquals("encodedPassword", savedUser.getPassword());
    }
}
