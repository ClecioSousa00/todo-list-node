import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskListsUseCases } from './create-task-lists'

let taskListsRepository: InMemoryTaskListsRepository
let taskListsUseCase: CreateTaskListsUseCases
describe('Create Task Lists Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListsRepository()
    taskListsUseCase = new CreateTaskListsUseCases(taskListsRepository)
  })
  it('should be able create task list', async () => {
    const { taskList } = await taskListsUseCase.execute({
      title: 'tarefa-1',
      userId: 'user-test',
    })

    expect(taskList.id).toEqual(expect.any(String))
  })
})
