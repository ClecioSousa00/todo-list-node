import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Create Task List (e2e) /task-list', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a task list', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'task-list-test',
      })

    expect(response.statusCode).toEqual(201)
  })
})
