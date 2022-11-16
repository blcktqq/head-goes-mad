import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as DaysActions from './days.actions';
import * as DaysFeature from './days.reducer';
import * as DaysSelectors from './days.selectors';

@Injectable({ providedIn: 'root' })
export class DaysFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DaysSelectors.getDaysLoaded));
  allDays$ = this.store.pipe(select(DaysSelectors.getAllDays));
  selectedDays$ = this.store.pipe(select(DaysSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DaysActions.initDays());
  }
  createDay(date: Date, description: string = '') {
    this.store.dispatch(
      DaysActions.createDay({ payload: { date, description } })
    );
  }
}
