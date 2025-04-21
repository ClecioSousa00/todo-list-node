import { TaskList } from '@/domain/entities/taskList'
import { TaskListRepository } from '@/domain/repositories/task-list-repository'

interface TaskListsUseCaseRequest {
  userId: string
}

interface TaskListsUseCaseResponse {
  taskLists: TaskList[]
}

export class GetAllTaskListsUseCases {
  constructor(private taskListsRepository: TaskListRepository) {}

  async execute({
    userId,
  }: TaskListsUseCaseRequest): Promise<TaskListsUseCaseResponse> {
    const taskLists = await this.taskListsRepository.getAll(userId)

    return {
      taskLists,
    }
  }
}
