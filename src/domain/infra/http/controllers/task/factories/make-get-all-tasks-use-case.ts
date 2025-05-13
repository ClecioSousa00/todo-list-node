import { GetAllTasksUseCase } from '@/domain/application/use-cases/task/get-all-task'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/domain/infra/database/prisma/prisma-task-repository'

export const makeGetAllTasksUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListRepository()

  const getAllTasksUseCase = new GetAllTasksUseCase(
    taskRepository,
    taskListRepository,
  )

  return getAllTasksUseCase
}
