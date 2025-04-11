import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

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
      .get('/task-lists')
      .set('Authorization', `bearer ${token}`)

    expect(getAllTaskListsResponse.statusCode).toEqual(200)
    expect(getAllTaskListsResponse.body.taskLists).toHaveLength(2)
    expect(getAllTaskListsResponse.body.taskLists).toEqual([
      expect.objectContaining({ title: 'backend' }),
      expect.objectContaining({ title: 'frontend' }),
    ])
  })
})
