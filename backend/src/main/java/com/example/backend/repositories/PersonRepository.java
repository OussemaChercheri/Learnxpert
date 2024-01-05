package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dao.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    public Optional<Person> findByEmail(String email);
}
