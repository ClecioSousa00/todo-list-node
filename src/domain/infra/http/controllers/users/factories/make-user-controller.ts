import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/users/register'
import { UserController } from '../user-controller'

export function makeUserController() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)
  const userController = new UserController(registerUseCase)

  return userController
}
