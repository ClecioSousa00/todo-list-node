import { BcryptHasher } from '@/domain/application/cryptography/bcryptjs-hasher'
import { RegisterUseCase } from '@/domain/application/use-cases/users/register'
import { PrismaUsersRepository } from '@/domain/infra/database/prisma/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashGenerator = new BcryptHasher()
  const registerUseCase = new RegisterUseCase(usersRepository, hashGenerator)

  return registerUseCase
}
