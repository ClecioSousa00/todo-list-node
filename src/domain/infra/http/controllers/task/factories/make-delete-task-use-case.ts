import { DeleteTaskUseCase } from '@/domain/application/use-cases/task/delete-task'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/domain/infra/database/prisma/prisma-task-repository'

export const makeDeleteTaskUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListRepository()

  const deleteTaskUseCase = new DeleteTaskUseCase(
    taskRepository,
    taskListRepository,
  )

  return deleteTaskUseCase
}
