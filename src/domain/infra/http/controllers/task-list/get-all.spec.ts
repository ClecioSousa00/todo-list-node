import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Get All Task Lists (e2e) /task-lists', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to get all user task lists', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'backend',
      })
    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'frontend',
      })

    const getAllTaskListsResponse = await request(app.server)
      .get('/task-list')
      .set('Authorization', `bearer ${token}`)

    expect(getAllTaskListsResponse.statusCode).toEqual(200)
    expect(getAllTaskListsResponse.body.taskLists).toHaveLength(2)
    expect(getAllTaskListsResponse.body.taskLists).toEqual([
      expect.objectContaining({ title: 'backend' }),
      expect.objectContaining({ title: 'frontend' }),
    ])
  })
})
