import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllTasksUseCase } from './get-all-task'
import { InMemoryTaskRepository } from 'test/in-memory-repositories/in-memory-task-repository'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/enterprise/entities/task'

let taskRepository: InMemoryTaskRepository
let taskListRepository: InMemoryTaskListRepository
let getAllTasksUseCase: GetAllTasksUseCase

describe('Get All Tasks Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskListRepository = new InMemoryTaskListRepository()
    getAllTasksUseCase = new GetAllTasksUseCase(
      taskRepository,
      taskListRepository,
    )
  })

  it('should be able to get all tasks', async () => {
    const taskList = TaskList.create({
      title: 'estudos back-end',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListRepository.create(taskList)

    const taskNode = Task.create(
      {
        description: 'Node',
        taskListId: taskList.id,
        dueDate: new Date(),
      },
      new UniqueEntityID('task-id-node'),
    )
    const taskPOO = Task.create({
      description: 'POO',
      taskListId: taskList.id,
      dueDate: new Date(),
    })

    await taskRepository.createMany([taskNode, taskPOO])

    const { tasks } = await getAllTasksUseCase.execute({
      taskListId: taskList.id.toString(),
      userId: taskList.userId.toString(),
    })

    expect(tasks).toHaveLength(2)
    expect(tasks).toEqual([
      expect.objectContaining({ description: 'Node' }),
      expect.objectContaining({ description: 'POO' }),
    ])
  })
})
