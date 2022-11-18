import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { map } from 'rxjs';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import * as TasksFeature from './tasks.reducer';
import * as TasksSelectors from './tasks.selectors';

@Injectable({ providedIn: 'root' })
export class TasksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TasksSelectors.getTasksLoaded));
  allTasks$ = this.store.pipe(select(TasksSelectors.getAllTasks));
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
    return this.allTasks$.pipe(map((t) => t.filter((t) => t.dateId === id)));
  }
}
