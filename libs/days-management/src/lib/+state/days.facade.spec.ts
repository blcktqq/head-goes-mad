import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as DaysActions from './days.actions';
import { DaysEffects } from './days.effects';
import { DaysFacade } from './days.facade';
import { DaysEntity } from './days.models';
import {
  DAYS_FEATURE_KEY,
  DaysState,
  initialDaysState,
  daysReducer,
} from './days.reducer';
import * as DaysSelectors from './days.selectors';

interface TestSchema {
  days: DaysState;
}

describe('DaysFacade', () => {
  let facade: DaysFacade;
  let store: Store<TestSchema>;
  const createDaysEntity = (id: string, name = ''): DaysEntity => ({
    id,
    date: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DAYS_FEATURE_KEY, daysReducer),
          EffectsModule.forFeature([DaysEffects]),
        ],
        providers: [DaysFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DaysFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDays$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDays$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDaysSuccess` to manually update list
     */
    it('allDays$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDays$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DaysActions.loadDaysSuccess({
          days: [createDaysEntity('AAA'), createDaysEntity('BBB')],
        })
      );

      list = await readFirst(facade.allDays$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
