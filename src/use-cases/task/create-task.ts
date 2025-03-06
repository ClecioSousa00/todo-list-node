import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskRepository } from '@/repositories/task-repository'
import { Task } from '@prisma/client'
import { TaskListNotFound } from '../errors/task-lists-not-found'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

type Tasks = Pick<Task, 'description' | 'is_checked' | 'due_date'>

interface TasksUseCaseRequest {
  tasks: Tasks[]
  taskListId: string
  userId: string
}

interface TasksUseCaseResponse {
  tasks: Task[]
}

export class CreateTasksUseCases {
  constructor(
    private tasksRepository: TaskRepository,
    private taskListsRepository: TaskListsRepository,
  ) {}

  async execute({
    tasks,
    taskListId,
    userId,
  }: TasksUseCaseRequest): Promise<TasksUseCaseResponse> {
    const taskList = await this.taskListsRepository.getById(taskListId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    if (taskList.user_id !== userId) {
      throw new InvalidCredentialsError()
    }

    const formattedTasks = tasks.map((task) => ({
      description: task.description,
      is_checked: task.is_checked,
      due_date: task.due_date,
      task_list_id: taskListId,
    }))

    const tasksToCreate = await this.tasksRepository.createMany(formattedTasks)

    return {
      tasks: tasksToCreate,
    }
  }
}
