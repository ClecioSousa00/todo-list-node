import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete Task List (e2e) /task-list', () => {
  beforeAll(() => app.ready())
  afterAll(() => app.close())

  it('Should be able to delete task list', async () => {
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

    const deleteTaskListResponse = await request(app.server)
      .delete(`/task-list/${taskList.id}`)
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(deleteTaskListResponse.status).toEqual(204)
  })
})
