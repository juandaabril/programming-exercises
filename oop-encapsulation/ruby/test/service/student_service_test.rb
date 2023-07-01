require 'rspec/autorun'
require_relative '../../src/service/student_service'
require_relative '../../src/repository/student_repository'

describe StudentService do
  let(:studentRepository) { double('StudentRepository') }
  let(:studentService) { StudentService.new(studentRepository) }

  it 'should save student with free tuition' do
    id = 1
    name = 'Any name'
    score = 97.0

    expect(studentRepository).to receive(:save).with(
      an_object_having_attributes(
        id: id,
        name: name,
        score: score,
        is_eligible_for_free_tuition: true
      )
    )

    studentService.create(id, name, score)
  end

  it 'should save student without free tuition' do
    id = 1
    name = 'Any name'
    score = 70

    expect(studentRepository).to receive(:save).with(
      an_object_having_attributes(
        id: id,
        name: name,
        score: score,
        is_eligible_for_free_tuition: false
      )
    )

    studentService.create(id, name, score)
  end

  it 'should not save student with negative score' do
    id = 1
    name = 'Any name'
    score = -50

    expect {
      studentService.create(id, name, score)
    }.to raise_error('Score must be between 0 and 100')
  end

  it 'should not save student with invalid score' do
    id = 1
    name = 'Any name'
    score = 200

    expect {
      studentService.create(id, name, score)
    }.to raise_error('Score must be between 0 and 100')
  end
end
