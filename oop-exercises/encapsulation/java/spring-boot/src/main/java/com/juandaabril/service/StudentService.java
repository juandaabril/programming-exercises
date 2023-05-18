package com.juandaabril.service;

import com.juandaabril.entity.Student;
import com.juandaabril.repository.StudentRepository;
import java.math.BigDecimal;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void create(Integer id, String name, Double score) {
        Student student = new Student();
        student.id = id;
        student.name = name;
        student.score = score;

        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Score must be between 0 and 100");
        }

        if (score > 95) {
            student.isEligibleForFreeTuition = true;
        } else {
            student.isEligibleForFreeTuition = false;
        }

        studentRepository.save(student);
    }
}
