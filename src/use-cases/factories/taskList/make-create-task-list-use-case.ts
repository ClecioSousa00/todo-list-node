import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { CreateTaskListsUseCases } from '@/use-cases/tasksLists/create-task-lists'

export const makeCreateTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListsRepository()
  const createTaskListUseCase = new CreateTaskListsUseCases(taskListRepository)

  return createTaskListUseCase
}
