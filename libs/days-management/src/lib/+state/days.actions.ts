import { createAction, props } from '@ngrx/store';
import { DaysEntity } from './days.models';

export const initDays = createAction('[Days Page] Init');

export const loadDaysSuccess = createAction(
  '[Days/API] Load Days Success',
  props<{ days: DaysEntity[] }>()
);

export const loadDaysFailure = createAction(
  '[Days/API] Load Days Failure',
  props<{ error: any }>()
);

export const createDay = createAction(
  '[Days Page] Create Day',
  props<{ payload: { date: Date; description: string } }>()
);

export const createDaySuccess = createAction('[Days Page] Create Day Success');

export const createDayFailurt = createAction('[Days Page] Create Day Failure');
