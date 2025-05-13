import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskListsUseCases } from './create-task-lists'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'

let taskListRepository: InMemoryTaskListRepository
let userRepository: InMemoryUserRepository
let taskListsUseCase: CreateTaskListsUseCases
describe('Create Task Lists Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListRepository()
    userRepository = new InMemoryUserRepository()
    taskListsUseCase = new CreateTaskListsUseCases(
      taskListRepository,
      userRepository,
    )
  })
  it('should be able create task list', async () => {
    const user = makeUser()

    await userRepository.create(user)

    const { taskListId } = await taskListsUseCase.execute({
      title: 'tarefa-1',
      userId: user.id.toString(),
    })

    expect(taskListId).toEqual(expect.any(String))
  })
  it('should no be able create task list if wrong user id', async () => {
    await expect(() =>
      taskListsUseCase.execute({
        title: 'tarefa-1',
        userId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)

    expect(taskListRepository.items).toHaveLength(0)
  })
})
