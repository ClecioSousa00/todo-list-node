import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from './factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { userProfile } = await getUserProfile.execute({
    userId: request.user.sub,
  })
  return reply.status(200).send({
    userProfile,
  })
}
