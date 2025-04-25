import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTaskUseCase } from './update-task'
import { InMemoryTaskRepository } from 'test/in-memory-repositories/in-memory-task-repository'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/enterprise/entities/task'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskNotFound } from '@/domain/errors/task-not-found'

let taskRepository: InMemoryTaskRepository
let taskListsRepository: InMemoryTaskListRepository
let updateTaskUseCase: UpdateTaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    taskListsRepository = new InMemoryTaskListRepository()
    updateTaskUseCase = new UpdateTaskUseCase(
      taskRepository,
      taskListsRepository,
    )
  })

  it('should be able update task', async () => {
    const taskList = TaskList.create({
      title: 'Lista de estudos node',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListsRepository.create(taskList)

    const task = Task.create({
      description: 'Estudar testes',
      dueDate: new Date(),
      taskListId: taskList.id,
    })

    await taskRepository.createMany([task])

    await updateTaskUseCase.execute({
      userId: taskList.userId.toString(),
      taskId: task.id.toString(),
      task: {
        ...task,
        description: 'Estudar Testes Unitários',
        isChecked: true,
        dueDate: new Date(),
      },
      taskListId: taskList.id.toString(),
    })

    const taskByIdResponse = await taskRepository.getTaskById(
      task.id.toString(),
      task.taskListId.toString(),
    )

    expect(taskByIdResponse?.description).toEqual('Estudar Testes Unitários')
  })

  it('should update only the specified task', async () => {
    const taskList = TaskList.create({
      title: 'Lista de tarefas',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListsRepository.create(taskList)

    const createdTask1 = Task.create({
      description: 'Ler documentação',
      dueDate: new Date(),
      taskListId: taskList.id,
    })

    const createdTask2 = Task.create({
      description: 'Escrever testes',
      dueDate: new Date(),
      taskListId: taskList.id,
    })

    await taskRepository.createMany([createdTask1, createdTask2])

    const [task1, task2] = await taskRepository.getAllTasks(
      taskList.id.toString(),
    )

    await updateTaskUseCase.execute({
      taskListId: taskList.id.toString(),
      userId: taskList.userId.toString(),
      taskId: task1.id.toString(),
      task: {
        description: 'Ler documentação atualizada',
        isChecked: true,
      },
    })

    const updatedTask1 = taskRepository.items.find(
      (item) => item.id.toString() === task1.id.toString(),
    )
    const untouchedTask2 = taskRepository.items.find(
      (item) => item.id.toString() === task2.id.toString(),
    )

    expect(updatedTask1?.description).toBe('Ler documentação atualizada')
    expect(updatedTask1?.isChecked).toBe(true)

    expect(untouchedTask2?.description).toBe('Escrever testes')
    expect(untouchedTask2?.isChecked).toBe(false)
  })

  it('should be not able to update task with the wrong task list id', async () => {
    const taskList = TaskList.create({
      title: 'Lista de tarefas',
      userId: new UniqueEntityID('user-1'),
    })

    await taskListsRepository.create(taskList)

    const createdTask = Task.create({
      description: 'Escrever testes',
      dueDate: new Date(),
      taskListId: taskList.id,
    })

    await taskRepository.createMany([createdTask])

    const task = taskRepository.items[0]

    await expect(() =>
      updateTaskUseCase.execute({
        taskListId: 'fake-id',
        userId: taskList.userId.toString(),
        taskId: task.id.toString(),
        task: {
          ...task,
          description: 'Estudar Testes Unitários',
          isChecked: true,
        },
      }),
    ).rejects.toBeInstanceOf(TaskListNotFound)

    await expect(() =>
      updateTaskUseCase.execute({
        taskListId: taskList.id.toString(),
        userId: taskList.userId.toString(),
        taskId: 'fake-task-id',
        task: {
          ...task,
          description: 'Estudar Testes Unitários',
          isChecked: true,
        },
      }),
    ).rejects.toBeInstanceOf(TaskNotFound)
  })
})
