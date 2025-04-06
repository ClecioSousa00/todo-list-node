import { Task } from '@prisma/client'

export type UpdateTaskData = Partial<
  Pick<Task, 'description' | 'is_checked' | 'due_date'>
>
