import { Injectable } from '@angular/core';
import { UserEntity, UserFacade } from '@hgm/user';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';
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
import { TaskApiService } from './services/task-api.service';

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

  moveOutdatedToHeap$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.loadTasksSuccess),
        map(({ tasks }) => tasks.filter((task) => task.dateId)),

        switchMap((tasks) =>
          this.daysFacade.outdatedDays$.pipe(
            map((days) => {
              return tasks.filter((task) => {
                const day = days.find((day) => day.id === task.dateId);
                return !!day;
              });
            }),
            switchMap((tasks) => from(tasks))
          )
        ),
        distinctUntilKeyChanged('id'),
        mergeMap((task) =>
          this.userFacade.selectedUser$
            .pipe(
              take(1),
              filter((v): v is UserEntity => !!v)
            )
            .pipe(
              switchMap((user) =>
                this.apiService.updateTask({ ...task, userId: user.id })
              )
            )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private userFacade: UserFacade,
    private apiService: TaskApiService,
    private daysFacade: DaysFacade
  ) {}
}
