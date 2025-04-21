import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTitleTaskListUseCase } from './update-title-task-list'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'

let taskListRepository: InMemoryTaskListRepository
let updateTitleTaskListUseCase: UpdateTitleTaskListUseCase
describe('Update Title Task List Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListRepository()
    updateTitleTaskListUseCase = new UpdateTitleTaskListUseCase(
      taskListRepository,
    )
  })
  it('should be able update task list title', async () => {
    const newTaskList = TaskList.create({
      title: 'lista de tarefa',
      userId: new UniqueEntityID('1'),
    })

    await taskListRepository.create(newTaskList)

    await updateTitleTaskListUseCase.execute({
      title: 'Lista de Tarefas',
      taskListId: newTaskList.id.toString(),
      userId: newTaskList.userId.toString(),
    })

    const taskList = await taskListRepository.getById(
      newTaskList.id.toString(),
      newTaskList.userId.toString(),
    )

    expect(taskList).toEqual(
      expect.objectContaining({ title: 'Lista de Tarefas' }),
    )
  })

  it('should be not able update task list title', async () => {
    await expect(() =>
      updateTitleTaskListUseCase.execute({
        title: 'Lista de Tarefas',
        taskListId: 'fake-task-list-id',
        userId: 'fake-user-id',
      }),
    ).rejects.toBeInstanceOf(TaskListNotFound)
  })
})
