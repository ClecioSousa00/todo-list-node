import { makeGetAllTaskListsUseCase } from '@/use-cases/factories/taskList/make-get-all-task-lists-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const makeGetAllUseCase = makeGetAllTaskListsUseCase()

  const { taskLists } = await makeGetAllUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    taskLists,
  })
}
