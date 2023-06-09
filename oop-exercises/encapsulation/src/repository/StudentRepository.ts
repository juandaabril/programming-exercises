import { Student } from '../entity/Student';

export interface StudentRepository {
  save(payment: Student): Promise<Student>;
}
