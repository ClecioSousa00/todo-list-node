import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get All Task (e2e) /tasks', () => {
  beforeAll(() => app.ready())
  afterAll(() => app.close())

  it('Should be able to get all tasks', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'estudar backend',
      })

    const getAllTaskListResponse = await request(app.server)
      .get('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send()

    const taskList = getAllTaskListResponse.body.taskLists[0]

    await request(app.server)
      .post(`/task-list/${taskList.id}/task`)
      .set('Authorization', `bearer ${token}`)
      .send([
        {
          description: 'Estudar Fastify',
          due_date: new Date(),
        },
        {
          description: 'Estudar Testes E2E',
          due_date: new Date(),
        },
      ])

    const getAllTasksResponse = await request(app.server)
      .get(`/task-list/${taskList.id}/tasks`)
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(getAllTasksResponse.body.tasks).toHaveLength(2)
    expect(getAllTasksResponse.body.tasks).toEqual([
      expect.objectContaining({
        description: 'Estudar Fastify',
      }),
      expect.objectContaining({
        description: 'Estudar Testes E2E',
      }),
    ])
  })
})
