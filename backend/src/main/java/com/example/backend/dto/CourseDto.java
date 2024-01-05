package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CourseDto {

    private int id;
    private String title;
    private String description;
    private String content;
    private MultipartFile image;

}
