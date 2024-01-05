package com.example.backend.dao;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;

@Entity
@Builder
@DiscriminatorValue(Role.Values.CLIENT)
public class Client extends Person {

    private String username;
    private String verificationToken;
    private String enabled;
    public Client(String username, String verificationToken, String enabled) {
        // Call the constructor of the superclass (Person)
        super(/* pass any necessary parameters for the Person constructor */);

        // Initialize the fields specific to the Client class
        this.username = username;
        this.verificationToken = verificationToken;
        this.enabled = enabled;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Role.CLIENT.getAuthorities();
    }
    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }



    public void setEnabled(boolean enabled) {
        this.enabled = String.valueOf(enabled);
    }
}
