import { Injectable } from '@angular/core';
import { UserEntity, UserFacade } from '@hgm/user';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { filter, switchMap, map, concat } from 'rxjs';
import { DaysmanagementService } from '../+state/services/days-managemenet.service';
import { TaskApiService } from './services/task-api.service';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import * as TasksFeature from './tasks.reducer';

@Injectable()
export class TasksEffects {
  createDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      fetch({
        onError: (action, error) => {
          console.error(error);
          return TasksActions.createTaskFailurt();
        },
        run: ({ payload: { description, dateId, title } }) =>
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
          ),
      })
    )
  );
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.initTasks),
      fetch({
        run: (action) =>
          this.userFacade.selectedUser$.pipe(
            filter((v): v is UserEntity => !!v),
            switchMap((v) =>
              concat(
                this.apiService.getTasks(v.id),
                this.apiService.getTasks$(v.id)
              )
            ),
            map((tasks) => TasksActions.loadTasksSuccess({ tasks }))
          ),
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private userFacade: UserFacade,
    private apiService: TaskApiService
  ) {}
}
