import { Prisma, Task } from '@prisma/client'

export interface TaskRepository {
  createMany(data: Prisma.TaskCreateManyInput[]): Promise<Task[]>
}
