package com.example.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.dao.ClientFeedback;
public interface ClientFeedbackRepository extends JpaRepository<ClientFeedback, Long> {
}
