import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Search Task List (e2e) /task-lists/search', () => {
  beforeAll(() => app.ready())

  afterAll(() => app.close())

  it('Should be able to get task lists by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'estudar backend',
      })
    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'ESTUDAR frontend',
      })
    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'docker',
      })

    const searchTaskListsResponse = await request(app.server)
      .get('/task-list/search?title=estudar')
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(searchTaskListsResponse.body.taskLists).toHaveLength(2)
    expect(searchTaskListsResponse.body.taskLists).toEqual([
      expect.objectContaining({
        title: 'estudar backend',
      }),
      expect.objectContaining({
        title: 'ESTUDAR frontend',
      }),
    ])
  })
})
