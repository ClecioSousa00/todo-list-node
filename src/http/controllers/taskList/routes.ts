import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function taskListRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
