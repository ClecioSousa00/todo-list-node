import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/users/register'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { registerBodySchema } from '../../schemas/users/register-user-schema'

export class UserController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async register(request: FastifyRequest, reply: FastifyReply) {
    const { email, name, password } = registerBodySchema.parse(request.body)

    try {
      await this.registerUseCase.execute({
        email,
        name,
        password,
      })

      return reply.status(201).send()
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({
          message: error.message,
        })
      }
      throw error
    }
  }
}
