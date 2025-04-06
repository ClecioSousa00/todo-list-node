import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTaskUseCase } from './update-task'
import { InMemoryTaskRepository } from '@/repositories/in-memory/in-memory-task-repository'
import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists-repository'
import { TaskListNotFound } from '../errors/task-lists-not-found'
import { TaskNotFound } from '../errors/task-not-found'

let taskRepository: InMemoryTaskRepository
let taskListsRepository: InMemoryTaskListsRepository
let updateTaskUseCase: UpdateTaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskListsRepository = new InMemoryTaskListsRepository()
    updateTaskUseCase = new UpdateTaskUseCase(
      taskRepository,
      taskListsRepository,
    )
  })

  it('should be able update task', async () => {
    const taskList = await taskListsRepository.create({
      title: 'Lista de estudos',
      user_id: 'user-1',
    })

    await taskListsRepository.create({
      title: 'Lista',
      user_id: 'user-1',
    })

    const [createdTask] = await taskRepository.createMany([
      {
        description: 'Estudar testes',
        due_date: new Date(),
        task_list_id: taskList.id,
      },
    ])

    const { task } = await updateTaskUseCase.execute({
      taskListId: taskList.id,
      userId: 'user-1',
      taskId: createdTask.id,
      taskProps: {
        ...createdTask,
        description: 'Estudar Testes Unitários',
        is_checked: true,
      },
    })

    expect(task.description).toEqual('Estudar Testes Unitários')
    expect(task.is_checked).toBe(true)
  })

  it('should update only the specified task', async () => {
    const taskList = await taskListsRepository.create({
      title: 'Lista de tarefas',
      user_id: 'user-1',
    })

    const [task1, task2] = await taskRepository.createMany([
      {
        description: 'Ler documentação',
        due_date: new Date(),
        task_list_id: taskList.id,
      },
      {
        description: 'Escrever testes',
        due_date: new Date(),
        task_list_id: taskList.id,
      },
    ])

    await updateTaskUseCase.execute({
      taskListId: taskList.id,
      userId: 'user-1',
      taskId: task1.id,
      taskProps: {
        description: 'Ler documentação atualizada',
        is_checked: true,
      },
    })

    const updatedTask1 = taskRepository.items.find(
      (item) => item.id === task1.id,
    )
    const untouchedTask2 = taskRepository.items.find(
      (item) => item.id === task2.id,
    )

    expect(updatedTask1?.description).toBe('Ler documentação atualizada')
    expect(updatedTask1?.is_checked).toBe(true)

    expect(untouchedTask2?.description).toBe('Escrever testes')
    expect(untouchedTask2?.is_checked).toBe(false)
  })

  it('should be not able to update task with the wrong task list id', async () => {
    const taskList = await taskListsRepository.create({
      title: 'Lista de estudos',
      user_id: 'user-1',
    })

    const [createdTask] = await taskRepository.createMany([
      {
        description: 'Estudar testes',
        due_date: new Date(),
        task_list_id: taskList.id,
      },
    ])

    await expect(() =>
      updateTaskUseCase.execute({
        taskListId: 'fake-id',
        userId: 'user-1',
        taskId: createdTask.id,
        taskProps: {
          ...createdTask,
          description: 'Estudar Testes Unitários',
          is_checked: true,
        },
      }),
    ).rejects.toBeInstanceOf(TaskListNotFound)

    await expect(() =>
      updateTaskUseCase.execute({
        taskListId: taskList.id,
        userId: 'user-1',
        taskId: 'fake-task-id',
        taskProps: {
          ...createdTask,
          description: 'Estudar Testes Unitários',
          is_checked: true,
        },
      }),
    ).rejects.toBeInstanceOf(TaskNotFound)
  })
})
