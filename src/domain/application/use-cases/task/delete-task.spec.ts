import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from 'test/in-memory-repositories/in-memory-task-repository'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/enterprise/entities/task'
import { TaskNotFound } from '@/domain/errors/task-not-found'
import { DeleteTaskUseCase } from './delete-task'

let taskRepository: InMemoryTaskRepository
let taskListRepository: InMemoryTaskListRepository
let deleteTaskUseCase: DeleteTaskUseCase

describe('Delete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskListRepository = new InMemoryTaskListRepository()
    deleteTaskUseCase = new DeleteTaskUseCase(
      taskRepository,
      taskListRepository,
    )
  })

  it('should be able to delete task', async () => {
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

    await deleteTaskUseCase.execute({
      taskId: taskNode.id.toString(),
      taskListId: taskNode.taskListId.toString(),
      userId: taskList.userId.toString(),
    })

    expect(taskRepository.items).toHaveLength(1)
    expect(taskRepository.items).toEqual([
      expect.objectContaining({
        description: 'POO',
      }),
    ])
  })

  it('should throw if trying to delete a task that does not exist', async () => {
    const taskList = TaskList.create({
      title: 'estudos back-end',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListRepository.create(taskList)

    await expect(() =>
      deleteTaskUseCase.execute({
        taskId: 'non-existent-task',
        taskListId: taskList.id.toString(),
        userId: taskList.userId.toString(),
      }),
    ).rejects.toBeInstanceOf(TaskNotFound)
  })
})
