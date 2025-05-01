import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'

export class InMemoryUserRepository implements UsersRepository {
  items: User[] = []
  async create(user: User) {
    this.items.push(user)
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return user ?? null
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    return user ?? null
  }
}
