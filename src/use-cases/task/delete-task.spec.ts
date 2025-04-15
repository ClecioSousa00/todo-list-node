import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists-repository'
import { InMemoryTaskRepository } from '@/repositories/in-memory/in-memory-task-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTaskUseCase } from './delete-task'
import { TaskNotFound } from '../errors/task-not-found'

let taskRepository: InMemoryTaskRepository
let taskListRepository: InMemoryTaskListsRepository
let deleteTaskUseCase: DeleteTaskUseCase

describe('Delete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskListRepository = new InMemoryTaskListsRepository()
    deleteTaskUseCase = new DeleteTaskUseCase(
      taskRepository,
      taskListRepository,
    )
  })

  it('should be able to delete task', async () => {
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

    const [task] = await taskRepository.getAllTasks(taskList.id)

    await deleteTaskUseCase.execute({
      taskId: task.id,
      taskListId: task.task_list_id,
      userId: taskList.user_id,
    })

    const getAllTasks = await taskRepository.getAllTasks(taskList.id)

    const taskDeleted = getAllTasks.find((item) => item.id === task.id)

    expect(getAllTasks).toHaveLength(1)
    expect(taskDeleted).toBeFalsy()
  })

  it('should throw if trying to delete a task that does not exist', async () => {
    const taskList = await taskListRepository.create({
      title: 'estudos back-end',
      user_id: 'user-1',
    })

    await expect(() =>
      deleteTaskUseCase.execute({
        taskId: 'non-existent-task',
        taskListId: taskList.id,
        userId: taskList.user_id,
      }),
    ).rejects.toBeInstanceOf(TaskNotFound)
  })
})
