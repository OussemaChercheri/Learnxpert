package com.tekup.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tekup.backend.dao.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}