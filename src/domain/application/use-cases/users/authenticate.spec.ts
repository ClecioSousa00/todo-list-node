import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { User } from '@/domain/enterprise/entities/user'

let usersRepository: InMemoryUserRepository
let authenticateUseCase: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const user = User.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
    })

    await usersRepository.create(user)

    const authenticateResponse = await authenticateUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(authenticateResponse.user.id.toString()).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const user = User.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
    })

    await usersRepository.create(user)

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
