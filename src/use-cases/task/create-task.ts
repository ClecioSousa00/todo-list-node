import { TaskListsRepository } from '@/repositories/task-lists-repository'
import { TaskRepository } from '@/repositories/task-repository'
import { Task } from '@prisma/client'
import { TaskListNotFound } from '../errors/task-lists-not-found'

type Tasks = Pick<Task, 'description' | 'due_date'>

interface TasksUseCaseRequest {
  tasks: Tasks[]
  taskListId: string
  userId: string
}

interface TasksUseCaseResponse {}

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
    const taskList = await this.taskListsRepository.getById(taskListId, userId)

    if (!taskList) {
      throw new TaskListNotFound()
    }

    const formattedTasks = tasks.map((task) => ({
      description: task.description,
      due_date: task.due_date,
      task_list_id: taskListId,
    }))

    await this.tasksRepository.createMany(formattedTasks)

    return {}
  }
}
