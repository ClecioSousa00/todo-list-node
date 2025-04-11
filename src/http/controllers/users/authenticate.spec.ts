import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (E2E) /sessions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Should be able to authenticate', async () => {
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

    expect(responseAuthenticate.statusCode).toEqual(200)
    expect(responseAuthenticate.body).toEqual({
      token: expect.any(String),
    })
  })
  it('Should not be able to authenticate with invalid credentials', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'nonexistent@email.com',
      password: 'wrong-password',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Invalid credentials error.',
    })
  })
})
