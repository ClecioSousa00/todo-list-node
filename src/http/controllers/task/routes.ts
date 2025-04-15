import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function taskRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/task-list/:id/task', create)
}
