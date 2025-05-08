import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { makeUser } from 'test/factories/make-user'
import { FakerHasher } from 'test/cryptography/faker-hasher'

let usersRepository: InMemoryUserRepository
let fakerHasher: FakerHasher
let authenticateUseCase: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    fakerHasher = new FakerHasher()
    authenticateUseCase = new AuthenticateUseCase(usersRepository, fakerHasher)
  })
  it('should be able to register', async () => {
    const user = makeUser({
      email: 'johndoe@gmail.com',
      password: await fakerHasher.hash('123456'),
    })

    await usersRepository.create(user)
    console.log('senha', user)

    const { id } = await authenticateUseCase.execute({
      email: user.email,
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
  })

  it.skip('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it.skip('should not be able to authenticate with wrong password', async () => {
    const user = makeUser({
      password: '123456',
    })

    await usersRepository.create(user)

    await expect(() =>
      authenticateUseCase.execute({
        email: user.email,
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
