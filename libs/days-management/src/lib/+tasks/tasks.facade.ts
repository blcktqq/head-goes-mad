import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import * as TasksSelectors from './tasks.selectors';

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
  public getTasksPerDay(id: string | null) {
    return this.notCompleted$.pipe(map((t) => t.filter((t) => t.dateId === id)));
  }
  public updateTask(id: string, task: Partial<TasksEntity>) {
    this.store.dispatch(TasksActions.updateTask({ task, taskId: id }));
  }
}
