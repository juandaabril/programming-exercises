package com.juandaabril.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.juandaabril.entity.Student;
import com.juandaabril.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

class StudentServiceTest {
    private StudentRepository studentRepository;
    private StudentService studentService;
    private ArgumentCaptor<Student> studentCaptor;

    @BeforeEach
    public void setup() {
        studentCaptor = ArgumentCaptor.forClass(Student.class);
        studentRepository = Mockito.mock(StudentRepository.class);
        studentService = new StudentService(studentRepository);
    }

    @Test
    public void shouldSaveStudentWithFreeTuition() {
        Integer id = 1;
        String name = "Any name";
        Double score = 97.0;

        studentService.create(id, name, score);

        verify(studentRepository, times(1)).save(studentCaptor.capture());

        Student student = studentCaptor.getValue();

        assertThat(student).isNotNull();
        assertThat(student.id).isEqualTo(1);
        assertThat(student.name).isEqualTo("Any name");
        assertThat(student.score).isEqualTo(score);
        assertThat(student.isEligibleForFreeTuition).isEqualTo(true);
    }

    @Test
    public void shouldSaveStudentWithoutFreeTuition() {
        Integer id = 1;
        String name = "Any name";
        Double score = 70.0;

        studentService.create(id, name, score);

        verify(studentRepository, times(1)).save(studentCaptor.capture());

        Student student = studentCaptor.getValue();

        assertThat(student).isNotNull();
        assertThat(student.id).isEqualTo(1);
        assertThat(student.name).isEqualTo("Any name");
        assertThat(student.score).isEqualTo(score);
        assertThat(student.isEligibleForFreeTuition).isEqualTo(false);
    }

    @Test
    public void shouldNotSaveStudentWithNegativeScore() {
        Integer id = 1;
        String name = "Any name";
        Double score = -50.0;

        assertThatThrownBy(
                () -> {
                    studentService.create(id, name, score);
                }
            )
            .isInstanceOf(RuntimeException.class)
            .hasMessageContaining("Score must be between 0 and 100");
    }

    @Test
    public void shouldNotSaveStudentWithInvalidScore() {
        Integer id = 1;
        String name = "Any name";
        Double score = 200.0;

        assertThatThrownBy(
                () -> {
                    studentService.create(id, name, score);
                }
            )
            .isInstanceOf(RuntimeException.class)
            .hasMessageContaining("Score must be between 0 and 100");
    }
}
