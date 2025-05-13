import { CreateTaskListsUseCases } from '@/domain/application/use-cases/task-list/create-task-lists'
import { PrismaTaskListRepository } from '@/domain/infra/database/prisma/prisma-task-list-repository'
import { PrismaUsersRepository } from '@/domain/infra/database/prisma/prisma-users-repository'

export const makeCreateTaskListUseCase = () => {
  const taskListRepository = new PrismaTaskListRepository()
  const usersRepository = new PrismaUsersRepository()
  const createTaskListUseCase = new CreateTaskListsUseCases(
    taskListRepository,
    usersRepository,
  )

  return createTaskListUseCase
}
