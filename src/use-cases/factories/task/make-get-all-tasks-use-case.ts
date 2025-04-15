import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/repositories/prisma/prisma-task-repository'
import { GetAllTasksUseCase } from '@/use-cases/task/get-all-task'

export const makeGetAllTasksUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListsRepository()

  const getAllTasksUseCase = new GetAllTasksUseCase(
    taskRepository,
    taskListRepository,
  )

  return getAllTasksUseCase
}
