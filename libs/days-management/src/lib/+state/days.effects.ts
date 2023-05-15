import { Injectable } from '@angular/core';
import { UserEntity, UserFacade } from '@hgm/user';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nx/angular';
import { concat, filter, map, switchMap } from 'rxjs';

import * as DaysActions from './days.actions';
import { DaysEntity } from './days.models';
import { DaysmanagementService } from './services/days-managemenet.service';

@Injectable()
export class DaysEffects {
  createDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaysActions.createDay),
      switchMap(({ payload: { date, description } }) =>
        this.userFacade.selectedUser$.pipe(
          filter((v): v is UserEntity => !!v),
          switchMap((v) =>
            this.dayManagementService.createDay({
              date: date,
              description: description,
              userId: v.id,
            })
          ),
          map((id) => DaysActions.createDaySuccess())
        )
      )
    )
  );
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaysActions.initDays),
      fetch({
        run: (action) =>
          this.userFacade.selectedUser$.pipe(
            filter((v): v is UserEntity => !!v),
            switchMap((v) =>
              concat(
                this.dayManagementService.getDays(v.id),
                this.dayManagementService.getDays$(v.id)
              )
            ),
            map((days) => {
              return DaysActions.loadDaysSuccess({
                days: days.map(
                  (v) =>
                    ({
                      id: v.id,
                      date: v.date,
                      description: v.description,
                    } as DaysEntity)
                ),
              });
            })
          ),
        onError: (action, error) => {
          console.error('Error', error);
          return DaysActions.loadDaysFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private userFacade: UserFacade,
    private dayManagementService: DaysmanagementService
  ) {}
}
