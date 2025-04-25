import { beforeEach, describe, expect, it } from 'vitest'

import { CreateTasksUseCases } from './create-task'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { InMemoryTaskRepository } from 'test/in-memory-repositories/in-memory-task-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'

let taskListsRepository: InMemoryTaskListRepository
let taskRepository: InMemoryTaskRepository
let taskUseCase: CreateTasksUseCases
describe('Create Task Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListRepository()
    taskRepository = new InMemoryTaskRepository()
    taskUseCase = new CreateTasksUseCases(taskRepository, taskListsRepository)
  })
  it('should be able create task', async () => {
    const taskList = TaskList.create({
      title: 'lista de tarefas',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListsRepository.create(taskList)

    await taskUseCase.execute({
      userId: taskList.userId.toString(),
      taskListId: taskList.id.toString(),
      tasks: [
        {
          description: 'task-1',
          dueDate: new Date(),
        },
        {
          description: 'task-2',
          dueDate: new Date(),
        },
      ],
    })

    expect(taskRepository.items).toHaveLength(2)
  })
  it('should be not able create task without to-do list', async () => {
    await expect(() =>
      taskUseCase.execute({
        userId: 'user-1',
        taskListId: 'fake id',
        tasks: [
          {
            description: 'task-1',
            dueDate: new Date(),
          },
        ],
      }),
    ).rejects.toBeInstanceOf(TaskListNotFound)
  })
})
