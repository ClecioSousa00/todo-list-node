import { FastifyInstance } from 'fastify'
import { create } from '../controllers/task/create'
import { getAll } from '../controllers/task/get-all'
import { update } from '../controllers/task/update'
import { deleteTask } from '../controllers/task/delete'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function taskRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/task-list/:id/tasks', create)
  app.get('/task-list/:id/tasks', getAll)
  app.delete('/task-list/:id/task/:taskId', deleteTask)
  app.patch('/task-list/:id/task/:taskId', update)
}
