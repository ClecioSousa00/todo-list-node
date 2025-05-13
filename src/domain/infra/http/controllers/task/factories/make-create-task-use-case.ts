import { CreateTasksUseCases } from '@/domain/application/use-cases/task/create-task'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/domain/infra/database/prisma/prisma-task-repository'

export const makeCreateTaskUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListRepository()
  const createTaskUseCase = new CreateTasksUseCases(
    taskRepository,
    taskListRepository,
  )
  return createTaskUseCase
}
