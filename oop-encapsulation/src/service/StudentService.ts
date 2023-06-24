import { Inject, Injectable } from '@nestjs/common';
import { StudentRepository } from '../repository/StudentRepository';
import { Student } from '../entity/Student';

@Injectable()
export class StudentService {
  constructor(@Inject('StudentRepository') private readonly studentRepository: StudentRepository) {}

  async create(id: number, name: string, score: number): Promise<void> {
    const student = new Student();
    student.id = id;
    student.name = name;
    student.score = score;

    if (score < 0 || score > 100) {
      throw new Error('Score must be between 0 and 100');
    }

    if (score > 95) {
      student.isEligibleForFreeTuition = true;
    } else {
      student.isEligibleForFreeTuition = false;
    }

    await this.studentRepository.save(student);
  }
}
