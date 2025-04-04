import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTaskListUseCase } from './delete-task-list'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let taskListRepository: InMemoryTaskListsRepository
let deleteTaskListUseCase: DeleteTaskListUseCase

describe('Delete Task List Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListsRepository()
    deleteTaskListUseCase = new DeleteTaskListUseCase(taskListRepository)
  })

  it('Should be able to delete task list', async () => {
    const taskList = await taskListRepository.create({
      title: 'task',
      user_id: '1',
    })
    const taskList2 = await taskListRepository.create({
      title: 'task-2',
      user_id: '1',
    })

    const { taskLists } = await deleteTaskListUseCase.execute({
      taskListId: taskList.id,
      userId: taskList.user_id,
    })

    const allTaskLists = await taskListRepository.getAll('1')

    expect(taskLists).toHaveLength(1)

    expect(allTaskLists).toEqual([
      expect.objectContaining({ id: taskList2.id }),
    ])
  })

  it('should be not able delete on task list', async () => {
    await expect(() =>
      deleteTaskListUseCase.execute({
        taskListId: 'fake-task-list-id',
        userId: 'fake-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not delete task list if it does not belong to the user', async () => {
    const taskList = await taskListRepository.create({
      title: 'task',
      user_id: 'user-1',
    })

    await expect(() =>
      deleteTaskListUseCase.execute({
        taskListId: taskList.id,
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
