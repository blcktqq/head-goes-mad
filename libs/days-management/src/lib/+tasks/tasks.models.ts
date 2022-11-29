import { TaskStatusEnum } from "./services/task-api.service";

/**
 * Interface for the 'Tasks' data
 */
export interface TasksEntity {
  id: string; // Primary ID
  title: string;
  description: string;
  dateId: string | null;
  status: TaskStatusEnum;
  createdAt: Date;
}
