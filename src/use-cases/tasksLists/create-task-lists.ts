import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskLists } from '@prisma/client'

interface TaskListsUseCaseRequest {
  title: string
  userId: string
}

interface TaskListsUseCaseResponse {
  taskList: TaskLists
}

export class CreateTaskListsUseCases {
  constructor(private taskListsRepository: TaskListsRepository) {}

  async execute({
    title,
    userId,
  }: TaskListsUseCaseRequest): Promise<TaskListsUseCaseResponse> {
    const taskList = await this.taskListsRepository.create({
      title,
      user_id: userId,
    })

    return {
      taskList,
    }
  }
}
