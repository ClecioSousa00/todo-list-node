import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Update Task List (e2e) /task-list', () => {
  beforeAll(() => app.ready())

  afterAll(() => app.close())

  it('Should be able to update task list', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'estudar backend',
      })

    const taskListResponse = await request(app.server)
      .get('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send()

    const taskList = taskListResponse.body.taskLists[0]

    const updateTaskListResponse = await request(app.server)
      .put('/task-list')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'Estudar Back-End',
        taskListId: taskList.id,
      })

    const searchTaskListsResponse = await request(app.server)
      .get('/task-list/search?title=estudar')
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(searchTaskListsResponse.body.taskLists).toEqual([
      expect.objectContaining({
        title: 'Estudar Back-End',
        id: taskList.id,
      }),
    ])

    expect(updateTaskListResponse.statusCode).toEqual(204)
  })
})
