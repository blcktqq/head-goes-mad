import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '@head-goes-mad/firebase-providers';
import { select, Store, Action } from '@ngrx/store';

import * as UserActions from './user.actions';

import * as UserSelectors from './user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UserSelectors.getUserLoaded));
  allUser$ = this.store.pipe(select(UserSelectors.getAllUser));
  selectedUser$ = this.store.pipe(select(UserSelectors.getSelected));

  constructor(
    private readonly store: Store,
    private authProvider: FirebaseAuthProvider
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UserActions.initUser());
  }

  signOut() {
    this.authProvider.logout();
  }
}
