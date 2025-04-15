import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getAll } from './get-all'
import { deleteTask } from './delete'
import { update } from './update'

export async function taskRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/task-list/:id/tasks', create)
  app.get('/task-list/:id/tasks', getAll)
  app.delete('/task-list/:id/task/:taskId', deleteTask)
  app.patch('/task-list/:id/task/:taskId', update)
}
