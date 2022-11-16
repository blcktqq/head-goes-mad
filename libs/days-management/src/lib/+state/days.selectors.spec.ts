import { DaysEntity } from './days.models';
import {
  daysAdapter,
  DaysPartialState,
  initialDaysState,
} from './days.reducer';
import * as DaysSelectors from './days.selectors';

describe('Days Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDaysId = (it: DaysEntity) => it.id;
  const createDaysEntity = (id: string, name = '') =>
    ({
      id,
      date: name || `name-${id}`,
    } as DaysEntity);

  let state: DaysPartialState;

  beforeEach(() => {
    state = {
      days: daysAdapter.setAll(
        [
          createDaysEntity('PRODUCT-AAA'),
          createDaysEntity('PRODUCT-BBB'),
          createDaysEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDaysState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Days Selectors', () => {
    it('getAllDays() should return the list of Days', () => {
      const results = DaysSelectors.getAllDays(state);
      const selId = getDaysId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DaysSelectors.getSelected(state) as DaysEntity;
      const selId = getDaysId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDaysLoaded() should return the current "loaded" status', () => {
      const result = DaysSelectors.getDaysLoaded(state);

      expect(result).toBe(true);
    });

    it('getDaysError() should return the current "error" state', () => {
      const result = DaysSelectors.getDaysError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
