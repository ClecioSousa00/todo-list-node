import { UpdateTitleTaskListUseCase } from '@/domain/application/use-cases/task-list/update-title-task-list'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'

export const makeUpdateTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListRepository()
  const updateTaskListUseCase = new UpdateTitleTaskListUseCase(
    taskListRepository,
  )

  return updateTaskListUseCase
}
