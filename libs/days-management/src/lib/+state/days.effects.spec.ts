import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as DaysActions from './days.actions';
import { DaysEffects } from './days.effects';

describe('DaysEffects', () => {
  let actions: Observable<Action>;
  let effects: DaysEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DaysEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(DaysEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DaysActions.initDays() });

      const expected = hot('-a-|', {
        a: DaysActions.loadDaysSuccess({ days: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
