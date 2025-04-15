import { makeCreateTaskUseCase } from '@/use-cases/factories/task/make-create-task-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z
    .object({
      description: z.string().min(5),
      due_date: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg)
        }
        return arg
      }, z.date()),
    })
    .array()

  const createTaskParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = createTaskParamsSchema.parse(request.params)
  const tasks = createTaskBodySchema.parse(request.body)

  const createTaskUseCase = makeCreateTaskUseCase()

  await createTaskUseCase.execute({
    taskListId: id,
    tasks,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
