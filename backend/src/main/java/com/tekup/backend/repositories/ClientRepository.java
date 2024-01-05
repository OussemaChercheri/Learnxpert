package com.tekup.backend.repositories;

import java.util.UUID;

import com.tekup.backend.dao.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
}
