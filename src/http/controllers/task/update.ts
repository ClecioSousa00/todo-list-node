import { makeUpdateTaskUseCase } from '@/use-cases/factories/task/make-update-task-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskBodySchema = z.object({
    description: z.string().min(5).optional(),
    due_date: z
      .preprocess((val) => {
        if (typeof val === 'string') {
          // Transforma de "DD/MM/YYYY" para "YYYY-MM-DD"
          const [day, month, year] = val.split('/')
          const isoString = `${year}-${month}-${day}`
          return new Date(isoString)
        }
        return val
      }, z.date())
      .optional(),
    is_checked: z.boolean().optional(),
  })

  const createTaskParamsSchema = z.object({
    id: z.string(),
    taskId: z.string(),
  })

  const { id, taskId } = createTaskParamsSchema.parse(request.params)
  const task = updateTaskBodySchema.parse(request.body)

  const updateTaskUseCase = makeUpdateTaskUseCase()

  await updateTaskUseCase.execute({
    taskId,
    taskListId: id,
    userId: request.user.sub,
    taskProps: task,
  })

  return reply.status(204).send({})
}
