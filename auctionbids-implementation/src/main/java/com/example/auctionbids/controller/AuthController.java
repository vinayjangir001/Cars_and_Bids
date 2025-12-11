package com.example.auctionbids.controller;

import com.example.auctionbids.entity.User;
import com.example.auctionbids.models.JwtRequest;
import com.example.auctionbids.models.JwtResponse;
import com.example.auctionbids.repository.UserRepository;
import com.example.auctionbids.security.JwtHelper;
import com.example.auctionbids.service.CustomUserDetailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private ApplicationContext applicationContext;


    private Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest request) throws Exception {


            authenticate(request.getEmail(), request.getPassword());

        System.out.println("after do authenticate method");

        final UserDetails userDetails = customUserDetailService.loadUserByUsername(request.getEmail());


        System.out.println(userDetails);

        final String token = this.helper.generateToken(userDetails);

        System.out.println("before generating token response");


        return ResponseEntity.ok(new JwtResponse(token));
//        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }



    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }


    @PostMapping("/create-user")
    public User createuser(@RequestBody User user){
        return customUserDetailService.createUser(user);

    }



    @GetMapping("/users")
    public List<User> getUser() {
        System.out.println("getting users");
        return customUserDetailService.getUsers();
    }


    @GetMapping("/current-user")
    public String getLoggedInUser(Principal principal){
        return principal.getName();
    }


    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = customUserDetailService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

}