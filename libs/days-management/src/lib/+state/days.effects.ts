import { Injectable } from '@angular/core';
import { ISignedInUser } from '@head-goes-mad/common';
import { UserEntity, UserFacade } from '@head-goes-mad/user';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { filter, map, switchMap } from 'rxjs';

import * as DaysActions from './days.actions';
import { DaysEntity } from './days.models';
import * as DaysFeature from './days.reducer';
import { DaysmanagementService } from './services/days-managemenet.service';

@Injectable()
export class DaysEffects {
  createDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaysActions.createDay),
      fetch({
        onError: (action, error) => {
          console.error(error);
          return DaysActions.createDayFailurt();
        },
        run: ({ payload: { date, description } }) =>
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
          ),
      })
    )
  );
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaysActions.initDays),
      fetch({
        run: (action) =>
          this.userFacade.selectedUser$.pipe(
            filter((v): v is UserEntity => !!v),
            switchMap((v) => this.dayManagementService.getDays(v.id)),
            map((days) =>
              DaysActions.loadDaysSuccess({
                days: days.map(
                  (v) =>
                    ({
                      id: v.id,
                      date: new Date(v.date),
                      description: v.description,
                    } as DaysEntity)
                ),
              })
            )
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
