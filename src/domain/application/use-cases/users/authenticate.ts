import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UsersRepository } from '../../repositories/users-repository'
import { UseCase } from '../use-case'
import { HashComparer } from '../../cryptography/hash-comparer'

interface AuthenticateInputDto {
  email: string
  password: string
}

interface AuthenticateOutputDto {
  id: string
}

export class AuthenticateUseCase
  implements UseCase<AuthenticateInputDto, AuthenticateOutputDto>
{
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInputDto): Promise<AuthenticateOutputDto> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      id: user.id.toString(),
    }
  }
}
