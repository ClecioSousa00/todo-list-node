import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllTaskListsUseCases } from './get-all-task-lists'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let taskListRepository: InMemoryTaskListRepository
let taskListsUseCase: GetAllTaskListsUseCases
describe('Get All Task Lists Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListRepository()
    taskListsUseCase = new GetAllTaskListsUseCases(taskListRepository)
  })
  it('should be able get all task lists user', async () => {
    const taskList = TaskList.create({
      title: 'tarefa-1',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListRepository.create(taskList)

    const { taskLists } = await taskListsUseCase.execute({
      userId: taskList.userId.toString(),
    })

    expect(taskLists.length).toBeGreaterThan(0)
  })
  it('should be able  to return empty list ', async () => {
    const { taskLists } = await taskListsUseCase.execute({ userId: 'user-1' })

    expect(taskLists.length).toEqual(0)
  })
  it('should return only task lists belonging to the specified user', async () => {
    const taskList1 = TaskList.create({
      title: 'tarefa-1',
      userId: new UniqueEntityID('user-1'),
    })
    const taskList2 = TaskList.create({
      title: 'tarefa-1',
      userId: new UniqueEntityID('user-2'),
    })

    await taskListRepository.create(taskList1)
    await taskListRepository.create(taskList2)

    const { taskLists } = await taskListsUseCase.execute({
      userId: taskList1.userId.toString(),
    })

    expect(taskLists.length).toBe(1)
  })
})
