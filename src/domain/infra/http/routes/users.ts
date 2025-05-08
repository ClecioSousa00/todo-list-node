import { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { authenticate } from '../controllers/users/authenticate'
import { verifyJWT } from '../middlewares/verify-jwt'
import { profile } from '../controllers/users/profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  // app.patch('/token/refresh', refresh)

  app.get('/profile', { onRequest: [verifyJWT] }, profile)
}
