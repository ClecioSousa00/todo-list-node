import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getAll } from './get-all'

export async function taskRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/task-list/:id/task', create)
  app.get('/task-list/:id/tasks', getAll)
}
