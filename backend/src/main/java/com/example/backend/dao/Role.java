package com.example.backend.dao;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    CLIENT(Values.CLIENT),
    ADMIN(Values.ADMIN),
    SUPER_ADMIN(Values.SUPER_ADMIN);

    @Getter
    private final String name;

    public List<SimpleGrantedAuthority> getAuthorities() {
        return Stream.of(new SimpleGrantedAuthority("ROLE_" + name)).toList();
    }

    public static class Values {
        public static final String CLIENT = "CLIENT";
        public static final String ADMIN = "ADMIN";
        public static final String SUPER_ADMIN = "SUPER_ADMIN";
    }
}
