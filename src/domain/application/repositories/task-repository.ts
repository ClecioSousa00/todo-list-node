import { Task } from '@/domain/enterprise/entities/task'

export interface TaskRepository {
  createMany(task: Task[]): Promise<void>
  updateTask(task: Task): Promise<void>
  deleteTask(task: Task): Promise<void>
  getAllTasks(taskListId: string): Promise<Task[]>
  getTaskById(taskId: string, taskListId: string): Promise<Task | null>
}
