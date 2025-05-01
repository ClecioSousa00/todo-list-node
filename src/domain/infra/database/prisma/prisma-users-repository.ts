import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'
import { prisma } from '@/lib/prisma'
import { prismaUserToDomain } from './mappers/prismaUserToDomain'

export class PrismaUsersRepository implements UsersRepository {
  async create(user: User) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password_hash: user.password,
      },
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) return user

    return prismaUserToDomain(user)
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) return user
    return prismaUserToDomain(user)
  }
}
