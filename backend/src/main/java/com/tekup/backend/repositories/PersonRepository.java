package com.tekup.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tekup.backend.dao.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    public Optional<Person> findByEmail(String email);
}
