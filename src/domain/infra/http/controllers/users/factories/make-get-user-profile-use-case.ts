import { GetUserProfileUseCase } from '@/domain/application/use-cases/users/get-user-profile'
import { PrismaUsersRepository } from '@/domain/infra/database/prisma/prisma-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
