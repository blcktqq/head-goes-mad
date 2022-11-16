import { Action } from '@ngrx/store';

import * as DaysActions from './days.actions';
import { DaysEntity } from './days.models';
import { DaysState, initialDaysState, daysReducer } from './days.reducer';

describe('Days Reducer', () => {
  const createDaysEntity = (id: string, name = ''): DaysEntity => ({
    id,
    date: name || `name-${id}`,
  });

  describe('valid Days actions', () => {
    it('loadDaysSuccess should return the list of known Days', () => {
      const days = [
        createDaysEntity('PRODUCT-AAA'),
        createDaysEntity('PRODUCT-zzz'),
      ];
      const action = DaysActions.loadDaysSuccess({ days });

      const result: DaysState = daysReducer(initialDaysState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = daysReducer(initialDaysState, action);

      expect(result).toBe(initialDaysState);
    });
  });
});
