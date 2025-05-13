import { UpdateTaskUseCase } from '@/domain/application/use-cases/task/update-task'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/domain/infra/database/prisma/prisma-task-repository'

export const makeUpdateTaskUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListRepository()

  const updateTaskUseCase = new UpdateTaskUseCase(
    taskRepository,
    taskListRepository,
  )

  return updateTaskUseCase
}
