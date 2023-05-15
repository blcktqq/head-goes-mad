import { Injectable, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import isToday from 'date-fns/isToday';
import * as DaysActions from './days.actions';
import * as DaysSelectors from './days.selectors';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DaysFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DaysSelectors.getDaysLoaded));
  allDays$ = this.store.pipe(select(DaysSelectors.getAllDays));
  heap$ = this.store.pipe(select(DaysSelectors.getHeap));
  ongoingDays$ = this.store.pipe(select(DaysSelectors.getOngoingDays));
  today$ = this.store.pipe(select(DaysSelectors.getToday));
  outdatedDays$ = this.store.pipe(select(DaysSelectors.getOutdatedDays));
  selectedDays$ = this.store.pipe(select(DaysSelectors.getSelected));

  public ongoingDays = toSignal(this.ongoingDays$, { initialValue: [] });
  public futureDays = computed(() =>
    this.ongoingDays().filter((d) => !isToday(d.date))
  );
  public today = toSignal(this.today$);

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DaysActions.initDays());
  }
  createDay(date: Date, description = '') {
    this.store.dispatch(
      DaysActions.createDay({ payload: { date, description } })
    );
  }
}
