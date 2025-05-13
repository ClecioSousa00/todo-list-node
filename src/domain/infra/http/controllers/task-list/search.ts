import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchTaskListUseCase } from './factories/make-search-task-list-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const titleTaskListQuerySchema = z.object({
    title: z.string().min(3),
  })

  const { title } = titleTaskListQuerySchema.parse(request.query)

  const searchTaskListUseCase = makeSearchTaskListUseCase()

  const { taskLists } = await searchTaskListUseCase.execute({
    title,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    taskLists,
  })
}
