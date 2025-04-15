import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/repositories/prisma/prisma-task-repository'
import { DeleteTaskUseCase } from '@/use-cases/task/delete-task'

export const makeDeleteTaskUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListsRepository()

  const deleteTaskUseCase = new DeleteTaskUseCase(
    taskRepository,
    taskListRepository,
  )

  return deleteTaskUseCase
}
