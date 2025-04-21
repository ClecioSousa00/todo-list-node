import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTaskListUseCase } from './delete-task-list'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'

let taskListRepository: InMemoryTaskListRepository
let deleteTaskListUseCase: DeleteTaskListUseCase

describe('Delete Task List Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListRepository()
    deleteTaskListUseCase = new DeleteTaskListUseCase(taskListRepository)
  })

  it('Should be able to delete task list', async () => {
    const taskList1 = TaskList.create({
      title: 'task',
      userId: new UniqueEntityID('userId-1'),
    })

    await taskListRepository.create(taskList1)

    const taskList2 = TaskList.create({
      title: 'task-2',
      userId: new UniqueEntityID('userId-1'),
    })

    await taskListRepository.create(taskList2)

    await deleteTaskListUseCase.execute({
      taskListId: taskList1.id.toString(),
      userId: taskList1.userId.toString(),
    })

    const allTaskLists = await taskListRepository.getAll('userId-1')

    expect(allTaskLists).toHaveLength(1)

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
    ).rejects.toBeInstanceOf(TaskListNotFound)
  })
})
