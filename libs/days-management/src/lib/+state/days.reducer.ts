import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { isToday } from 'date-fns';

import * as DaysActions from './days.actions';
import { DaysEntity } from './days.models';

export const DAYS_FEATURE_KEY = 'days';

export interface DaysState extends EntityState<DaysEntity> {
  selectedId?: string | number; // which Days record has been selected
  loaded: boolean; // has the Days list been loaded
  error?: string | null; // last known error (if any)
}

export interface DaysPartialState {
  readonly [DAYS_FEATURE_KEY]: DaysState;
}

export const daysAdapter: EntityAdapter<DaysEntity> =
  createEntityAdapter<DaysEntity>();

export const initialDaysState: DaysState = daysAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialDaysState,
  on(DaysActions.initDays, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DaysActions.loadDaysSuccess, (state, { days }) => {
    state = daysAdapter.setAll(days, { ...state, loaded: true });
    state = daysAdapter.setOne(
      {
        date: new Date(null as unknown as Date),
        id: null,
        description: '',
        isHeap: true,
      },
      { ...state }
    );
    const today = days.find((d) => !d.isHeap && isToday(d.date));
    if (today) {
      const id = daysAdapter.selectId(today);
      state = { ...state, selectedId: id };
    }
    return state;
  }),
  on(DaysActions.loadDaysFailure, (state, { error }) => ({ ...state, error }))
);

export function daysReducer(state: DaysState | undefined, action: Action) {
  return reducer(state, action);
}
