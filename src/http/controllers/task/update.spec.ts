import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Task (e2e) /tasks', () => {
  beforeAll(() => app.ready())
  afterAll(() => app.close())

  it('Should be able to delete task', async () => {
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
      .post(`/task-list/${taskList.id}/tasks`)
      .set('Authorization', `bearer ${token}`)
      .send([
        {
          description: 'Estudar Fastify',
          due_date: '28/02/2025',
        },
        {
          description: 'Estudar Testes E2E',
          due_date: '28/02/2025',
        },
      ])

    const getAllTasksResponse = await request(app.server)
      .get(`/task-list/${taskList.id}/tasks`)
      .set('Authorization', `bearer ${token}`)
      .send()

    const [task] = getAllTasksResponse.body.tasks

    const updatedTaskResponse = await request(app.server)
      .patch(`/task-list/${taskList.id}/task/${task.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        description: 'Estudar os conceitos do Fastify',
      })

    const newListTasks = await request(app.server)
      .get(`/task-list/${taskList.id}/tasks`)
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(updatedTaskResponse.status).toEqual(204)
    expect(newListTasks.body.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Estudar os conceitos do Fastify',
        }),
      ]),
    )
  })
})
