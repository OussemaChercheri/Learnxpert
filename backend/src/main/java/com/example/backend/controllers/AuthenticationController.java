package com.example.backend.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.Person;
import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.AuthenticationRequest;
import com.example.backend.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    // @PostMapping("/register")
    // public ResponseEntity<AuthentificationResponse> register(
    // @RequestBody RegisterRequest request
    // ){
    // return ResponseEntity.ok(service.register(request));
    // }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> adminAuthenticate(
            @RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(service.authenticateForAdmin(request));
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/current")
    public ResponseEntity<Person> getCurrentUser() {
        try {
            return ResponseEntity.ok(service.getCurrentUser());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
