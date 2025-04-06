import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '@/repositories/in-memory/in-memory-task-repository'
import { CreateTasksUseCases } from './create-task'
import { TaskListNotFound } from '../errors/task-lists-not-found'
import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists-repository'

let taskListsRepository: InMemoryTaskListsRepository
let taskRepository: InMemoryTaskRepository
let taskUseCase: CreateTasksUseCases
describe('Create Task Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListsRepository()
    taskRepository = new InMemoryTaskRepository()
    taskUseCase = new CreateTasksUseCases(taskRepository, taskListsRepository)
  })
  it('should be able create task', async () => {
    const { id: taskListId } = await taskListsRepository.create({
      title: 'lista de tarefas',
      user_id: 'user-1',
    })

    const { tasks } = await taskUseCase.execute({
      userId: 'user-1',
      taskListId,
      tasks: [
        {
          description: 'task-1',
          due_date: new Date(),
          is_checked: false,
        },
      ],
    })

    console.log(tasks.length)
    expect(tasks.length).toBeGreaterThan(0)
  })
  it('should be not able create task without to-do list', async () => {
    await expect(() =>
      taskUseCase.execute({
        userId: 'user-1',
        taskListId: 'fake id',
        tasks: [
          {
            description: 'task-1',
            due_date: new Date(),
            is_checked: false,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(TaskListNotFound)
  })
})
