import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { GetAllTaskListsUseCases } from '@/use-cases/tasksLists/get-all-task-lists'

export const makeGetAllTaskListsUseCase = () => {
  const taskListRepository = new PrismaTaskListsRepository()
  const getAllTaskListUseCase = new GetAllTaskListsUseCases(taskListRepository)

  return getAllTaskListUseCase
}
