import { createFeatureSelector, createSelector } from '@ngrx/store';
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
