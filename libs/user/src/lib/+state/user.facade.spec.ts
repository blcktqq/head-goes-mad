import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as UserActions from './user.actions';
import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';
import { UserEntity } from './user.models';
import {
  USER_FEATURE_KEY,
  UserState,
  initialUserState,
  userReducer,
} from './user.reducer';
import * as UserSelectors from './user.selectors';

interface TestSchema {
  user: UserState;
}

describe('UserFacade', () => {
  let facade: UserFacade;
  let store: Store<TestSchema>;
  const createUserEntity = (id: string, name = ''): UserEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
          EffectsModule.forFeature([UserEffects]),
        ],
        providers: [UserFacade],
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
      facade = TestBed.inject(UserFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allUser$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allUser$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadUserSuccess` to manually update list
     */
    it('allUser$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allUser$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        UserActions.loadUserSuccess({
          user: [createUserEntity('AAA'), createUserEntity('BBB')],
        })
      );

      list = await readFirst(facade.allUser$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
