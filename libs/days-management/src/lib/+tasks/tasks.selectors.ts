import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStatusEnum } from './services/task-api.service';
import { TASKS_FEATURE_KEY, TasksState, tasksAdapter } from './tasks.reducer';

// Lookup the 'Tasks' feature state managed by NgRx
export const getTasksState =
  createFeatureSelector<TasksState>(TASKS_FEATURE_KEY);

const { selectAll, selectEntities } = tasksAdapter.getSelectors();

export const getTasksLoaded = createSelector(
  getTasksState,
  (state: TasksState) => state.loaded
);

export const getTasksError = createSelector(
  getTasksState,
  (state: TasksState) => state.error
);

export const getAllTasks = createSelector(getTasksState, (state: TasksState) =>
  selectAll(state)
);
export const getUncompletedTasks = createSelector(getAllTasks, (tasks) =>
  tasks.filter((t) => t.status !== TaskStatusEnum.Completed)
);

export const getTasksEntities = createSelector(
  getTasksState,
  (state: TasksState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getTasksState,
  (state: TasksState) => state.selectedId
);

export const getSelected = createSelector(
  getTasksEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
