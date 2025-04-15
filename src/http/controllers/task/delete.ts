import { makeDeleteTaskUseCase } from '@/use-cases/factories/task/make-delete-task-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const createTaskParamsSchema = z.object({
    id: z.string(),
    taskId: z.string(),
  })

  const { id, taskId } = createTaskParamsSchema.parse(request.params)

  const deleteTaskUseCase = makeDeleteTaskUseCase()

  await deleteTaskUseCase.execute({
    taskId,
    taskListId: id,
    userId: request.user.sub,
  })

  return reply.status(204).send({})
}
