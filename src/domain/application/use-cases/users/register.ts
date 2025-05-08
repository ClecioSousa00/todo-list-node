import { User } from '@/domain/enterprise/entities/user'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { UsersRepository } from '../../repositories/users-repository'
import { UseCase } from '../use-case'
import { HashGenerator } from '../../cryptography/hash-generator'

interface RegisterInputDto {
  name: string
  email: string
  password: string
}

interface RegisterOutputDto {}

export class RegisterUseCase
  implements UseCase<RegisterInputDto, RegisterOutputDto>
{
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterInputDto): Promise<RegisterOutputDto> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await this.hashGenerator.hash(password)
    const user = User.create({
      email,
      name,
      password: password_hash,
    })

    await this.usersRepository.create(user)

    return {}
  }
}
