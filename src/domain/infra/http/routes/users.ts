import { FastifyInstance } from 'fastify'
import { makeUserController } from '../controllers/users/factories/make-user-controller'

export async function userRoutes(app: FastifyInstance) {
  const userController = makeUserController()

  app.post('/users', (request, reply) =>
    userController.register(request, reply),
  )
}
