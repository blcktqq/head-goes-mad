import { computed, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { TaskStatusEnum } from './services/task-api.service';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import * as TasksSelectors from './tasks.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class TasksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TasksSelectors.getTasksLoaded));
  allTasks$ = this.store.pipe(select(TasksSelectors.getAllTasks));
  notCompleted$ = this.store.pipe(select(TasksSelectors.getUncompletedTasks));
  selectedTasks$ = this.store.pipe(select(TasksSelectors.getSelected));

  public allTasks = toSignal(this.allTasks$, { initialValue: [] });

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TasksActions.initTasks());
  }
  public createTask(task: TasksEntity) {
    this.store.dispatch(TasksActions.createTask({ payload: task }));
  }

  public deleteTask(taskId: string) {
    this.store.dispatch(TasksActions.deleteTask({ taskId }));
  }

  public getTasksPerDay(id: string | null) {
    return this.allTasks$.pipe(
      map((t) =>
        t
          .filter((t) => t.dateId === id)
          .sort((t) => (t.status !== TaskStatusEnum.Completed ? -1 : 1))
      )
    );
  }

  public getTasksPerDaySignal(id: string | null) {
    return computed(() =>
      this.allTasks()
        .filter((t) => t.dateId === id)
        .sort((t) => (t.status !== TaskStatusEnum.Completed ? -1 : 1))
    );
  }

  public getNonCompletedTasksPerDay(id: string | null) {
    return this.notCompleted$.pipe(
      map((t) => t.filter((t) => t.dateId === id))
    );
  }

  public updateTask(id: string, task: Partial<TasksEntity>) {
    this.store.dispatch(TasksActions.updateTask({ task, taskId: id }));
  }
}
