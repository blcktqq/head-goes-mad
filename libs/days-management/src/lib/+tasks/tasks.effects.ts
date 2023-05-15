import { Injectable } from '@angular/core';
import { UserEntity, UserFacade } from '@hgm/user';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nx/angular';
import { isBefore } from 'date-fns';
import {
  concat,
  distinct,
  distinctUntilKeyChanged,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { DaysFacade } from '../+state/days.facade';
import { TaskApiService, TaskStatusEnum } from './services/task-api.service';

import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksEffects {
  createDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({ payload: { description, dateId, title } }) =>
        this.userFacade.selectedUser$.pipe(
          filter((v): v is UserEntity => !!v),
          switchMap((v) =>
            this.apiService.createTask(
              {
                dateId,
                description,
                title,
              },
              v.id
            )
          ),
          map((id) => TasksActions.createTaskSuccess())
        )
      )
    )
  );
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.initTasks),
      fetch({
        run: (action) => {
          return this.userFacade.selectedUser$.pipe(
            filter((v): v is UserEntity => !!v),
            switchMap((v) =>
              concat(
                this.apiService.getTasks(v.id),
                this.apiService.getTasks$(v.id)
              )
            ),
            map((tasks) => TasksActions.loadTasksSuccess({ tasks }))
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        },
      })
    )
  );

  // moveOutdatedToHeap$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(TasksActions.loadTasksSuccess),
  //       map(({ tasks }) => tasks.filter((task) => task.dateId)),

  //       switchMap((tasks) =>
  //         this.daysFacade.outdatedDays$.pipe(
  //           map((days) => {
  //             return tasks.filter((task) => {
  //               const day = days.find((day) => day.id === task.dateId);
  //               return !!day;
  //             });
  //           }),
  //           switchMap((tasks) => from(tasks))
  //         )
  //       ),
  //       distinctUntilKeyChanged('id'),
  //       mergeMap((task) =>
  //         this.apiService.updateTask(task.id, { dateId: null })
  //       )
  //     ),
  //   { dispatch: false }
  // );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({ task, taskId }) => this.apiService.updateTask(taskId, task)),
      map(() => TasksActions.updateTaskSuccess())
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({ taskId }) => this.apiService.deleteTask(taskId)),
      map(() => TasksActions.deleteTaskSuccess())
    )
  );
  constructor(
    private readonly actions$: Actions,
    private userFacade: UserFacade,
    private apiService: TaskApiService,
    private daysFacade: DaysFacade
  ) {}
}
