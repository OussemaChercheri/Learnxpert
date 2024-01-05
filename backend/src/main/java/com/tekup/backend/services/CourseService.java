package com.tekup.backend.services;

import com.tekup.backend.dao.Course;
import com.tekup.backend.dto.CourseDto;
import com.tekup.backend.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
public class CourseService {
    @Autowired
    private final CourseRepository courseRepository;

    private final String FOLDER_PATH="Users/serr/Documents/Projet/MyFiles";

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }



    private Course course;


    public Course createCourse(CourseDto courseDto) {
        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setDescription(courseDto.getDescription());
        course.setContent(courseDto.getContent());
        // Map CourseDto fields to Course entity
        // For example: course.setTitle(courseDto.getTitle());
        //Handel image upload

        return courseRepository.save(course);
    }


    public Optional<Course> updateCourse(Long id, CourseDto courseDto) {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if (optionalCourse.isPresent()) {
            Course existingCourse = optionalCourse.get();
            existingCourse.setTitle(courseDto.getTitle());
            existingCourse.setDescription(courseDto.getDescription());
            existingCourse.setContent(courseDto.getContent());

            // Update existingCourse fields with courseDto
            // For example: existingCourse.setTitle(courseDto.getTitle());
            // Update other fields accordingly
            return Optional.of(courseRepository.save(existingCourse));
        } else {
            return Optional.empty();
        }
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
