package com.tekup.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tekup.backend.config.JwtService;
import com.tekup.backend.dao.Client;
import com.tekup.backend.dao.Person;
import com.tekup.backend.dto.AuthenticationRequest;
import com.tekup.backend.dto.AuthenticationResponse;


import com.tekup.backend.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;

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
