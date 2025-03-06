import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskListsUseCases } from './create-task-lists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let taskListsRepository: InMemoryTaskListsRepository
let userRepository: InMemoryUsersRepository
let taskListsUseCase: CreateTaskListsUseCases
describe('Create Task Lists Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListsRepository()
    userRepository = new InMemoryUsersRepository()
    taskListsUseCase = new CreateTaskListsUseCases(
      taskListsRepository,
      userRepository,
    )
  })
  it('should be able create task list', async () => {
    const { id: userId } = await userRepository.create({
      email: 'johndoe@gmail.com',
      name: 'john doe',
      password_hash: '123456',
    })

    const { taskList } = await taskListsUseCase.execute({
      title: 'tarefa-1',
      userId,
    })

    expect(taskList.id).toEqual(expect.any(String))
  })
  it('should be able create task list with wrong user id', async () => {
    await expect(() =>
      taskListsUseCase.execute({
        title: 'tarefa-1',
        userId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
