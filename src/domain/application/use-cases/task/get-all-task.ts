import { Task } from '@/domain/enterprise/entities/task'
import { TaskRepository } from '../../repositories/task-repository'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'

interface GetAllTasksUseCaseRequest {
  taskListId: string
  userId: string
}
interface GetAllTasksUseCaseResponse {
  tasks: Task[]
}

export class GetAllTasksUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListRepository: TaskListRepository,
  ) {}

  async execute({
    taskListId,
    userId,
  }: GetAllTasksUseCaseRequest): Promise<GetAllTasksUseCaseResponse> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const tasks = await this.taskRepository.getAllTasks(taskListId)
    return {
      tasks,
    }
  }
}
