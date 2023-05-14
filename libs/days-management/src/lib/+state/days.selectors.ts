import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isAfter, isBefore, isToday } from 'date-fns';
import { DAYS_FEATURE_KEY, DaysState, daysAdapter } from './days.reducer';

// Lookup the 'Days' feature state managed by NgRx
export const getDaysState = createFeatureSelector<DaysState>(DAYS_FEATURE_KEY);

const { selectAll, selectEntities } = daysAdapter.getSelectors();

export const getDaysLoaded = createSelector(
  getDaysState,
  (state: DaysState) => state.loaded
);

export const getDaysError = createSelector(
  getDaysState,
  (state: DaysState) => state.error
);

export const getAllDays = createSelector(getDaysState, (state: DaysState) =>
  selectAll(state)
);
export const getOngoingDays = createSelector(getAllDays, (state) =>
  state.filter(
    (day) => !day.isHeap && (isToday(day.date) || isAfter(day.date, new Date()))
  )
);
export const getToday = createSelector(getAllDays, (state) =>
  state.find(
    (day) => isToday(day.date)
  )
);
export const getOutdatedDays = createSelector(getAllDays, (state) =>
  state.filter(
    (day) => !day.isHeap && !isToday(day.date) && isBefore(day.date, new Date())
  )
);
export const getDaysEntities = createSelector(
  getDaysState,
  (state: DaysState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDaysState,
  (state: DaysState) => state.selectedId
);

export const getSelected = createSelector(
  getDaysEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getHeap = createSelector(
  getAllDays,
  (days) => days.find((d) => d.isHeap) ?? null
);
