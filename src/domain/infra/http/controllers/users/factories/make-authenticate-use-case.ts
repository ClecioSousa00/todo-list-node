import { BcryptHasher } from '@/domain/application/cryptography/bcryptjs-hasher'
import { AuthenticateUseCase } from '@/domain/application/use-cases/users/authenticate'
import { PrismaUsersRepository } from '@/domain/infra/database/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hasherComparer = new BcryptHasher()
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    hasherComparer,
  )

  return authenticateUseCase
}
