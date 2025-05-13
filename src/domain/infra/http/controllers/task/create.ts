import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskUseCase } from './factories/make-create-task-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z
    .object({
      description: z.string().min(5),
      dueDate: z.preprocess((val) => {
        if (typeof val === 'string') {
          // Transforma de "DD/MM/YYYY" para "YYYY-MM-DD"
          const [day, month, year] = val.split('/')
          const isoString = `${year}-${month}-${day}`
          return new Date(isoString)
        }
        return val
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
