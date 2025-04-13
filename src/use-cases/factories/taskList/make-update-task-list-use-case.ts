import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { UpdateTitleTaskListUseCase } from '@/use-cases/tasksLists/update-title-task-list'

export const makeUpdateTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListsRepository()
  const updateTaskListUseCase = new UpdateTitleTaskListUseCase(
    taskListRepository,
  )

  return updateTaskListUseCase
}
