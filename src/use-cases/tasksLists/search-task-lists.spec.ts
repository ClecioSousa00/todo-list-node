import { beforeEach, describe, expect, it } from 'vitest'
import { SearchTaskListsUseCase } from './search-task-lists'
import { InMemoryTaskListsRepository } from '@/repositories/in-memory/in-memory-task-lists'

let taskListsRepository: InMemoryTaskListsRepository
let searchTaskListUseCase: SearchTaskListsUseCase
describe('Search Task Lists Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListsRepository()
    searchTaskListUseCase = new SearchTaskListsUseCase(taskListsRepository)
  })
  it('should be able task lists by title', async () => {
    await taskListsRepository.create({
      title: 'lista de compras',
      user_id: '1',
    })

    await taskListsRepository.create({
      title: 'matérias para estudo',
      user_id: '1',
    })

    const { taskLists } = await searchTaskListUseCase.execute({
      title: 'compras',
      userId: '1',
    })

    expect(taskLists.length).toEqual(1)

    expect(taskLists).toEqual([
      expect.objectContaining({ title: 'lista de compras' }),
    ])
  })
})
