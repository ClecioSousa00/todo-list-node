import { hash } from 'bcryptjs'
import { User } from '@/domain/enterprise/entities/user'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)
    const user = User.create({
      email,
      name,
      password: password_hash,
    })

    await this.usersRepository.create(user)

    return { user }
  }
}
