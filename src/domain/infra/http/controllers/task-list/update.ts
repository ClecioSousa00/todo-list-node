import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateTaskListUseCase } from './factories/make-update-task-list-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskListBodySchema = z.object({
    title: z.string(),
    taskListId: z.string(),
  })

  const { taskListId, title } = updateTaskListBodySchema.parse(request.body)

  const updateTaskListUseCase = makeUpdateTaskListUseCase()

  await updateTaskListUseCase.execute({
    taskListId,
    title,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
