import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/repositories/prisma/prisma-task-repository'
import { UpdateTaskUseCase } from '@/use-cases/task/update-task'

export const makeUpdateTaskUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListsRepository()

  const updateTaskUseCase = new UpdateTaskUseCase(
    taskRepository,
    taskListRepository,
  )

  return updateTaskUseCase
}
