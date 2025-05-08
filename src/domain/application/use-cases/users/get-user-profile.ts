import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'
import { UsersRepository } from '../../repositories/users-repository'
import { UseCase } from '../use-case'

interface GetUserProfileInputDto {
  userId: string
}

interface GetUserProfileOutputDto {
  userProfile: {
    id: string
    name: string
    email: string
  }
}

export class GetUserProfileUseCase
  implements UseCase<GetUserProfileInputDto, GetUserProfileOutputDto>
{
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileInputDto): Promise<GetUserProfileOutputDto> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFoundError()

    return {
      userProfile: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
      },
    }
  }
}
