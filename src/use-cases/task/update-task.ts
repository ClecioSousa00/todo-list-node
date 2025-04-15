import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskRepository } from '@/repositories/task-repository'
import { TaskListNotFound } from '../errors/task-lists-not-found'
import { TaskNotFound } from '../errors/task-not-found'
import { UpdateTaskData } from '@/@types/task'

interface UpdateTaskUseCaseRequest {
  userId: string
  taskListId: string
  taskProps: UpdateTaskData
  taskId: string
}

interface UpdateTaskUseCaseResponse {}

export class UpdateTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListsRepository: TaskListsRepository,
  ) {}

  async execute({
    taskProps,
    taskListId,
    userId,
    taskId,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const taskList = await this.taskListsRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const task = await this.taskRepository.getTaskById(taskId, taskListId)

    if (!task) {
      throw new TaskNotFound()
    }

    await this.taskRepository.updateTask(
      taskProps,

      taskId,
    )

    return {}
  }
}
