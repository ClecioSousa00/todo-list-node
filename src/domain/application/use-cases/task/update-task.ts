import { TaskRepository } from '../../repositories/task-repository'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'
import { TaskNotFound } from '@/domain/errors/task-not-found'
import { PartialTaskProps } from '@/@types/task'

interface UpdateTaskUseCaseRequest {
  userId: string
  task: PartialTaskProps
  taskId: string
  taskListId: string
}

interface UpdateTaskUseCaseResponse {}

export class UpdateTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListsRepository: TaskListRepository,
  ) {}

  async execute({
    userId,
    taskId,
    taskListId,
    task,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const taskList = await this.taskListsRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const getTask = await this.taskRepository.getTaskById(
      taskId,
      taskList.id.toString(),
    )

    if (!getTask) {
      throw new TaskNotFound()
    }

    getTask.update(task)

    await this.taskRepository.updateTask(getTask)

    return {}
  }
}
