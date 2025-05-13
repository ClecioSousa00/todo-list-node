import { DeleteTaskListUseCase } from '@/domain/application/use-cases/task-list/delete-task-list'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'

export const makeDeleteTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListRepository()
  const deleteTaskListUseCase = new DeleteTaskListUseCase(taskListRepository)

  return deleteTaskListUseCase
}
