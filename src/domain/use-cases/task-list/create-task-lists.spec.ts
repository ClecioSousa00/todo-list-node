import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskListsUseCases } from './create-task-lists'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { User } from '@/domain/entities/user'

let taskListRepository: InMemoryTaskListRepository
let userRepository: InMemoryUserRepository
let taskListsUseCase: CreateTaskListsUseCases
describe('Create Task Lists Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListRepository()
    userRepository = new InMemoryUserRepository()
    taskListsUseCase = new CreateTaskListsUseCases(taskListRepository)
  })
  it('should be able create task list', async () => {
    const user = User.create({
      email: 'johndoe@gmail.com',
      name: 'john doe',
      password: '123456',
    })

    const { id: userId } = await userRepository.create(user)

    const { taskList } = await taskListsUseCase.execute({
      title: 'tarefa-1',
      userId: userId.toString(),
    })

    expect(taskList.id.toString()).toEqual(expect.any(String))
  })
})
