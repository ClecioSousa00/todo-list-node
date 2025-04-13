import { makeUpdateTaskListUseCase } from '@/use-cases/factories/taskList/make-update-task-list-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

  return reply.status(201).send()
}
