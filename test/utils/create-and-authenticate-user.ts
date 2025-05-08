import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johnDoe@gmail.com',
    password: '123456789',
  })

  const responseAuthenticate = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

  const { token } = responseAuthenticate.body

  return { token }
}
