package com.example.backend.dao;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;

@Entity
@DiscriminatorValue(Role.Values.ADMIN)
@Getter
public class Admin extends Person {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Role.ADMIN.getAuthorities();
    }
}
