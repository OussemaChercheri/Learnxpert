package com.example.backend.dao;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Entity
public class ClientFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String feedback;
    private String status;



    public void setStatus(String status) {
        this.status = status;
    }
// getters and setters
}
