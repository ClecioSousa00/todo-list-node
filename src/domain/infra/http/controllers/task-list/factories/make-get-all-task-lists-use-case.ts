import { GetAllTaskListsUseCases } from '@/domain/application/use-cases/task-list/get-all-task-lists'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'

export const makeGetAllTaskListsUseCase = () => {
  const taskListRepository = new PrismaTaskListRepository()
  const getAllTaskListUseCase = new GetAllTaskListsUseCases(taskListRepository)

  return getAllTaskListUseCase
}
