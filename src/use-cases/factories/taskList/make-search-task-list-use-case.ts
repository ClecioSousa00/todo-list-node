import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { SearchTaskListsUseCase } from '@/use-cases/tasksLists/search-task-lists'

export const makeSearchTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListsRepository()
  const searchTaskListUseCase = new SearchTaskListsUseCase(taskListRepository)
  return searchTaskListUseCase
}
