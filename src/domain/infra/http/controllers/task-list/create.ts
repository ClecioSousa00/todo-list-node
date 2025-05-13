import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskListUseCase } from './factories/make-create-task-list-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTaskLisBodySchema = z.object({
    title: z.string().min(3),
  })

  const { title } = createTaskLisBodySchema.parse(request.body)

  const createTaskListUseCase = makeCreateTaskListUseCase()

  await createTaskListUseCase.execute({
    title,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
