import { TaskRepository } from '../../repositories/task-repository'
import { TaskListRepository } from '../../repositories/task-list-repository'
import { TaskListNotFound } from '@/domain/errors/task-lists-not-found'

type TaskProps = {
  id: string
  description: string
  dueDate: Date
  isChecked: boolean
  taskListId: string
}

interface GetAllTasksInputDto {
  taskListId: string
  userId: string
}
interface GetAllTasksOutputDto {
  tasks: TaskProps[]
}

export class GetAllTasksUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private taskListRepository: TaskListRepository,
  ) {}

  async execute({
    taskListId,
    userId,
  }: GetAllTasksInputDto): Promise<GetAllTasksOutputDto> {
    const taskList = await this.taskListRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const allTasks = await this.taskRepository.getAllTasks(taskListId)

    const tasks: TaskProps[] = allTasks.map((task) => ({
      description: task.description,
      dueDate: task.dueDate,
      id: task.id.toString(),
      isChecked: task.isChecked,
      taskListId: task.taskListId.toString(),
    }))

    return {
      tasks,
    }
  }
}
