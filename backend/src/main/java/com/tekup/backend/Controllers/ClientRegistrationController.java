package com.tekup.backend.Controllers;


import com.tekup.backend.dao.Client;
import com.tekup.backend.dto.RegisterRequest;
import com.tekup.backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client")
public class ClientRegistrationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@RequestBody RegisterRequest registerRequest) {
        Client client = authenticationService.registerClient(registerRequest);
        return new ResponseEntity<>(authenticationService, HttpStatus.CREATED);}
}