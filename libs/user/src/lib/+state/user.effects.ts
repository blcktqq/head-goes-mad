import { Injectable } from '@angular/core';
import { ISignedInUser } from '@hgm/common';
import { FirebaseAuthProvider } from '@hgm/firebase-providers';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nx/angular';
import { filter, from, iif, map, tap } from 'rxjs';

import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';

@Injectable()
export class UserEffects implements OnInitEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.initUser),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return from(this.authProvider.getUser$).pipe(
            map(() => this.authProvider.getUser()),
            filter((user): user is ISignedInUser => !!user),
            map((user) =>
              UserActions.loadUserSuccess({
                user: { id: user.id, name: user.name, photoUrl: user.photo },
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UserActions.loadUserFailure({ error });
        },
      })
    )
  );
  constructor(
    private readonly actions$: Actions,
    private authProvider: FirebaseAuthProvider
  ) {}

  ngrxOnInitEffects(): Action {
    return UserActions.initUser();
  }
}
