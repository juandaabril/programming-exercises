
require_relative '../repository/student_repository'
require_relative '../entity/student'

class StudentService
  def initialize(studentRepository)
    @studentRepository = studentRepository
  end

  def create(id, name, score)
    student = Student.new
    student.id = id
    student.name = name
    student.score = score

    if score < 0 || score > 100
      raise 'Score must be between 0 and 100'
    end

    if score > 95
      student.is_eligible_for_free_tuition = true
    else
      student.is_eligible_for_free_tuition = false
    end

    @studentRepository.save(student)
  end
end
