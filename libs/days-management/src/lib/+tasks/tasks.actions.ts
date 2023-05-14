import { createAction, props } from '@ngrx/store';
import { TasksEntity } from './tasks.models';

export const initTasks = createAction('[Tasks Page] Init');

export const loadTasksSuccess = createAction(
  '[Tasks/API] Load Tasks Success',
  props<{ tasks: TasksEntity[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks/API] Load Tasks Failure',
  props<{ error: any }>()
);
export const createTask = createAction(
  '[Tasks Page] Create Task',
  props<{ payload: TasksEntity }>()
);

export const createTaskSuccess = createAction(
  '[Tasks Page] Create Task Success'
);

export const createTaskFailurt = createAction(
  '[Tasks Page] Create Task Failure'
);

export const deleteTask = createAction(
  '[Tasks Page] Delete Task',
  props<{ taskId: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks Page] Delete Task Success'
);

export const deleteTaskFailure = createAction(
  '[Tasks Page] Delete Task Failure'
);

export const updateTask = createAction(
  '[Tasks Page] Update Task',
  props<{ task: Partial<TasksEntity>; taskId: string }>()
);

export const updateTaskSuccess = createAction(
  '[Tasks Page] Update Task Success'
);

export const updateTaskFailure = createAction(
  '[Tasks Page] Update Task Failure'
);
