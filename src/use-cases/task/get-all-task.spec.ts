import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists-repository'
import { InMemoryTaskRepository } from '@/repositories/in-memory/in-memory-task-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllTasksUseCase } from './get-all-task'

let taskRepository: InMemoryTaskRepository
let taskListRepository: InMemoryTaskListsRepository
let getAllTasksUseCase: GetAllTasksUseCase

describe('Get All Tasks Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskListRepository = new InMemoryTaskListsRepository()
    getAllTasksUseCase = new GetAllTasksUseCase(
      taskRepository,
      taskListRepository,
    )
  })

  it('should be able to get all tasks', async () => {
    const taskList = await taskListRepository.create({
      title: 'estudos back-end',
      user_id: 'user-1',
    })

    await taskRepository.createMany([
      {
        description: 'Node',
        task_list_id: taskList.id,
        due_date: new Date(),
      },
      {
        description: 'POO',
        task_list_id: taskList.id,
        due_date: new Date(),
      },
    ])

    const { tasks } = await getAllTasksUseCase.execute({
      taskListId: taskList.id,
      userId: taskList.user_id,
    })

    expect(tasks).toHaveLength(2)
    expect(tasks).toEqual([
      expect.objectContaining({ description: 'Node' }),
      expect.objectContaining({ description: 'POO' }),
    ])
  })
})
