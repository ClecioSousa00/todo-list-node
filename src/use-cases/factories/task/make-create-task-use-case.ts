import { PrismaTaskListsRepository } from '@/repositories/prisma/prisma-task-list-repository'
import { PrismaTaskRepository } from '@/repositories/prisma/prisma-task-repository'
import { CreateTasksUseCases } from '@/use-cases/task/create-task'

export const makeCreateTaskUseCase = () => {
  const taskRepository = new PrismaTaskRepository()
  const taskListRepository = new PrismaTaskListsRepository()
  const createTaskUseCase = new CreateTasksUseCases(
    taskRepository,
    taskListRepository,
  )
  return createTaskUseCase
}
