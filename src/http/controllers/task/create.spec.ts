import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Task (e2e) /task-list/:id/task', () => {
  beforeAll(() => app.ready())
  afterAll(() => app.close())

  it('Should be able to create a task', async () => {
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

    const createTaskResponse = await request(app.server)
      .post(`/task-list/${taskList.id}/tasks`)
      .set('Authorization', `bearer ${token}`)
      .send([
        {
          description: 'Estudar Fastify',
          due_date: '28/02/2025',
        },
      ])

    expect(getAllTaskListResponse.body.taskLists).toHaveLength(1)
    expect(createTaskResponse.status).toEqual(201)
  })
})
