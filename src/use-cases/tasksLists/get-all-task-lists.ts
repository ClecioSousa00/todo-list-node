import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskLists } from '@prisma/client'

interface TaskListsUseCaseRequest {
  userId: string
}

interface TaskListsUseCaseResponse {
  taskLists: TaskLists[]
}

export class GetAllTaskListsUseCases {
  constructor(private taskListsRepository: TaskListsRepository) {}

  async execute({
    userId,
  }: TaskListsUseCaseRequest): Promise<TaskListsUseCaseResponse> {
    const taskLists = await this.taskListsRepository.getAll(userId)

    return {
      taskLists,
    }
  }
}
