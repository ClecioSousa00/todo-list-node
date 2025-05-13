import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteTaskListUseCase } from './factories/make-delete-task-list-use-case'

export async function deleteTaskList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTaskListParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteTaskListParamsSchema.parse(request.params)

  const deleteTaskListUseCase = makeDeleteTaskListUseCase()

  await deleteTaskListUseCase.execute({
    taskListId: id,
    userId: request.user.sub,
  })

  return reply.status(204).send({})
}
