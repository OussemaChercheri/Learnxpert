package com.example.backend.services;

import org.springframework.security.authentication.AuthenticationManager;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.config.JwtService;
import com.example.backend.dao.Client;
import com.example.backend.dao.Person;
import com.example.backend.dto.AuthenticationRequest;
import com.example.backend.dto.AuthenticationResponse;


import com.example.backend.dao.Client;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.services.ClientRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    // private final PersonRepository repository;
    // private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    // public AuthentificationResponse register(RegisterRequest request) {
    // var client = Client.builder()
    // .email(request.getEmail())
    // .fullName(request.getFullName())
    // .password(passwordEncoder.encode(request.getPassword()))
    // .build();
    // repository.save(user);
    // var jwtToken = jwtService.generateToken(user);
    // return AuthentificationResponse.builder()
    // .accessToken(jwtToken)
    // .user(user)
    // .build();

    // }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authenticate = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(), request.getPassword()));

        Person user = (Person) authenticate.getPrincipal();

        AuthenticationResponse authentificationResponse = AuthenticationResponse.builder()
                .accessToken(jwtService.generateToken(user)).user(user).build();
        return authentificationResponse;
    }

    public AuthenticationResponse authenticateForAdmin(AuthenticationRequest request) {

        AuthenticationResponse authentificationResponse = authenticate(request);
        if (authentificationResponse.getUser() instanceof Client) {
            throw new RuntimeException("user not allowed here");
        }

        return authentificationResponse;
    }

    public Person getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null)
                throw new IllegalArgumentException("not authenticate");
            return (Person) authentication.getPrincipal();
        } catch (Exception e) {
            throw new IllegalArgumentException("not authenticate");
        }
    }




        @Autowired
        private ClientRegistrationService clientRegistrationService;



        public Client registerClient(RegisterRequest registerRequest) {
            Client client = new Client(
                    registerRequest.getUsername(),
                    registerRequest.getEmail(),
                    registerRequest.getPassword()
            );

            return clientRegistrationService.registerClient(client);
        }
    }

