import { SearchTaskListsUseCase } from '@/domain/application/use-cases/task-list/search-task-lists'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'

export const makeSearchTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListRepository()
  const searchTaskListUseCase = new SearchTaskListsUseCase(taskListRepository)
  return searchTaskListUseCase
}
