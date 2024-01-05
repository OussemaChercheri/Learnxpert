package com.tekup.backend.dao;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue(Role.Values.SUPER_ADMIN)
@Getter
@Setter

public class SuperAdmin extends Person {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Role.SUPER_ADMIN.getAuthorities();
    }
}

