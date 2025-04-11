import { makeCreateTaskListUseCase } from '@/use-cases/factories/taskList/make-create-task-list-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

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
