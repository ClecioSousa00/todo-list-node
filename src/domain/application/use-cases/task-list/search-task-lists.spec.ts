import { beforeEach, describe, expect, it } from 'vitest'
import { SearchTaskListsUseCase } from './search-task-lists'
import { InMemoryTaskListRepository } from 'test/in-memory-repositories/in-memory-task-list-repository'
import { TaskList } from '@/domain/enterprise/entities/taskList'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let taskListsRepository: InMemoryTaskListRepository
let searchTaskListUseCase: SearchTaskListsUseCase
describe('Search Task Lists Use Case', () => {
  beforeEach(() => {
    taskListsRepository = new InMemoryTaskListRepository()
    searchTaskListUseCase = new SearchTaskListsUseCase(taskListsRepository)
  })
  it('should be able task lists by title', async () => {
    const taskList1 = TaskList.create({
      title: 'lista de compras',
      userId: new UniqueEntityID('1'),
    })

    await taskListsRepository.create(taskList1)

    const taskList2 = TaskList.create({
      title: 'matérias para estudo',
      userId: new UniqueEntityID('1'),
    })

    await taskListsRepository.create(taskList2)

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
