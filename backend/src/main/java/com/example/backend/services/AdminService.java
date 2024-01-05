package com.example.backend.services;

import com.example.backend.dao.Admin;
import com.example.backend.dto.AdminDto;
import com.example.backend.mappers.AdminMapper;
import com.example.backend.repositories.AdminRepository;

import org.mapstruct.factory.Mappers;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin createAdmin(AdminDto adminDto) {
        try {
            Admin admin = new Admin();
            admin.setEmail(adminDto.getEmail());
            admin.setPassword(passwordEncoder.encode(adminDto.getPassword()));
            admin.setFullName(adminDto.getFullName());

            // Map CourseDto fields to Course entity
            // For example: course.setTitle(courseDto.getTitle());
            return adminRepository.save(admin);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("duplicate key");
        }
    }

    public Optional<Admin> updateAdmin(Long id, AdminDto adminDto) {
        try {
            System.out.println("update : " + id);
            Optional<Admin> optionalCourse = adminRepository.findById(id);
            if (optionalCourse.isPresent()) {
                Admin existingAdmin = optionalCourse.get();
                System.out.println("show admin : " + existingAdmin);
                AdminMapper mapper = Mappers.getMapper(AdminMapper.class);
                mapper.updateCustomerFromDto(adminDto, existingAdmin);
                System.out.println("show admin : " + existingAdmin);

                // Update existingCourse fields with courseDto
                // For example: existingCourse.setTitle(courseDto.getTitle());
                // Update other fields accordingly
                return Optional.of(adminRepository.save(existingAdmin));
            } else {
                return Optional.empty();
            }
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("duplicate key");
        } catch (RuntimeException e) {
            System.out.println(e);
            throw new RuntimeException("duplicate key");
        }
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}