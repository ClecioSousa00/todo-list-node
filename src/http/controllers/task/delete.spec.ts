import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete Task (e2e) /tasks', () => {
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

    const [task] = getAllTasksResponse.body.tasks

    const deleteTaskResponse = await request(app.server)
      .delete(`/task-list/${taskList.id}/task/${task.id}`)
      .set('Authorization', `bearer ${token}`)
      .send()

    const newListTasks = await request(app.server)
      .get(`/task-list/${taskList.id}/tasks`)
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(deleteTaskResponse.status).toEqual(204)
    expect(newListTasks.body.tasks).toHaveLength(1)
    expect(newListTasks.body.tasks).toEqual([
      expect.objectContaining({
        description: 'Estudar Testes E2E',
      }),
    ])
  })
})
