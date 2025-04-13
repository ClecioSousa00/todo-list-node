import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getAll } from './get-all'
import { search } from './search'
import { update } from './update'

export async function taskListRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/task-list', create)
  app.get('/task-list', getAll)
  app.get('/task-list/search', search)
  app.put('/task-list', update)
}
