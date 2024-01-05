package com.example.backend.repositories;

import java.util.UUID;

import com.example.backend.dao.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
}
