import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTitleTaskListUseCase } from './update-title-task-list'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let taskListRepository: InMemoryTaskListsRepository
let updateTitleTaskListUseCase: UpdateTitleTaskListUseCase
describe('Update Title Task List Use Case', () => {
  beforeEach(() => {
    taskListRepository = new InMemoryTaskListsRepository()
    updateTitleTaskListUseCase = new UpdateTitleTaskListUseCase(
      taskListRepository,
    )
  })
  it('should be able update task list title', async () => {
    const createdTaskList = await taskListRepository.create({
      title: 'lista de tarefa',
      user_id: '1',
    })

    const { taskList } = await updateTitleTaskListUseCase.execute({
      title: 'Lista de Tarefas',
      taskListId: createdTaskList.id,
      userId: createdTaskList.user_id,
    })

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
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
