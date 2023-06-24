import { StudentService } from '../../src/service/StudentService';
import { StudentRepository } from '../../src/repository/StudentRepository';

describe('StudentService', () => {
  let studentService: StudentService;
  let studentRepository: StudentRepository;

  beforeEach(() => {
    studentRepository = {
      save: jest.fn(),
    };
    studentService = new StudentService(studentRepository);
  });

  test('should save student with free tuition', async () => {
    const id = 1;
    const name = 'Any name';
    const score = 97.0;

    await studentService.create(id, name, score);

    expect(studentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: id,
        name: name,
        score: score,
        isEligibleForFreeTuition: true,
      }),
    );
  });

  test('should save student without free tuition', async () => {
    const id = 1;
    const name = 'Any name';
    const score = 70;

    await studentService.create(id, name, score);

    expect(studentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: id,
        name: name,
        score: score,
        isEligibleForFreeTuition: false,
      }),
    );
  });

  test('should not save student with negative score', async () => {
    const id = 1;
    const name = 'Any name';
    const score = -50;

    await expect(async () => {
      await studentService.create(id, name, score);
    }).rejects.toThrow('Score must be between 0 and 100');
  });

  test('should not save student with invalid score', async () => {
    const id = 1;
    const name = 'Any name';
    const score = 200;

    await expect(async () => {
      await studentService.create(id, name, score);
    }).rejects.toThrow('Score must be between 0 and 100');
  });
});
