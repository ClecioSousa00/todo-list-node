import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { DeleteTaskListUseCase } from '@/use-cases/tasksLists/delete-task-list'

export const makeDeleteTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListsRepository()
  const deleteTaskListUseCase = new DeleteTaskListUseCase(taskListRepository)

  return deleteTaskListUseCase
}
