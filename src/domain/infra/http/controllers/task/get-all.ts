import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetAllTasksUseCase } from './factories/make-get-all-tasks-use-case'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const createTaskParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = createTaskParamsSchema.parse(request.params)

  const getAllTasksUseCase = makeGetAllTasksUseCase()

  const { tasks } = await getAllTasksUseCase.execute({
    taskListId: id,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    tasks,
  })
}
