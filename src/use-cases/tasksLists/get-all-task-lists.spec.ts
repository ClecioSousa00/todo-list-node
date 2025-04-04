import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllTaskListsUseCases } from './get-all-task-lists'
import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists-repository'

let taskListsRepository: InMemoryTaskListsRepository
let taskListsUseCase: GetAllTaskListsUseCases
describe('Get All Task Lists Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListsRepository()
    taskListsUseCase = new GetAllTaskListsUseCases(taskListsRepository)
  })
  it('should be able get all task lists user', async () => {
    await taskListsRepository.create({
      title: 'tarefa-1',
      user_id: 'user-1',
    })

    const { taskLists } = await taskListsUseCase.execute({ userId: 'user-1' })

    expect(taskLists.length).toBeGreaterThan(0)
  })
  it('should be able  to return empty list ', async () => {
    const { taskLists } = await taskListsUseCase.execute({ userId: 'user-1' })

    expect(taskLists.length).toEqual(0)
  })
  it('should return only task lists belonging to the specified user', async () => {
    await taskListsRepository.create({ title: 'tarefa-1', user_id: 'user-1' })
    await taskListsRepository.create({ title: 'tarefa-2', user_id: 'user-2' })

    const { taskLists } = await taskListsUseCase.execute({ userId: 'user-1' })

    expect(taskLists.length).toBe(1)
  })
})
