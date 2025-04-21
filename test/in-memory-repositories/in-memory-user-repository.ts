import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/domain/repositories/users-repository'

export class InMemoryUserRepository implements UsersRepository {
  items: User[] = []
  async create(user: User) {
    this.items.push(user)
    return user
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
