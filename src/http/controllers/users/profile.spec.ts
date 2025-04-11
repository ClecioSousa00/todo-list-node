import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (E2E) /profile', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const responseProfile = await request(app.server)
      .get('/profile')
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(responseProfile.statusCode).toEqual(200)

    expect(responseProfile.body.user).toEqual(
      expect.objectContaining({
        email: 'johnDoe@gmail.com',
      }),
    )
  })
})
