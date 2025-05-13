import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { create } from '../controllers/task-list/create'
import { getAll } from '../controllers/task-list/get-all'
import { search } from '../controllers/task-list/search'
import { update } from '../controllers/task-list/update'
import { deleteTaskList } from '../controllers/task-list/delete'

export async function taskListRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/task-list', create)
  app.get('/task-list', getAll)
  app.get('/task-list/search', search)
  app.put('/task-list', update)
  app.delete('/task-list/:id', deleteTaskList)
}
