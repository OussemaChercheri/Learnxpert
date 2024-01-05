package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dao.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
