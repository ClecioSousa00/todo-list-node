import { User } from '@/domain/enterprise/entities/user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Prisma } from '@prisma/client'

export function prismaUserToDomain(user: Prisma.UserCreateInput): User {
  return User.create(
    {
      email: user.email,
      name: user.name,
      password: user.password_hash,
      createdAt:
        typeof user.created_at === 'string'
          ? new Date(user.created_at)
          : user.created_at,
    },
    new UniqueEntityID(user.id),
  )
}
