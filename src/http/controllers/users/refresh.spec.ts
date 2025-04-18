import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token (E2E) /token', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Should be able to refresh token', async () => {
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

    const cookies = responseAuthenticate.get('Set-Cookie')

    const refreshResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies ?? [''])
      .send()

    expect(refreshResponse.statusCode).toEqual(200)
    expect(refreshResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
