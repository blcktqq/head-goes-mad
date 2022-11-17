import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserFacade } from '@hgm/user';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {
  constructor(private userFacade: UserFacade, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isUserLoaded();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isUserLoaded().pipe(
      tap((result) => {
        if (!result) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }

  private isUserLoaded() {
    return this.userFacade.isUserLoaded$.pipe(take(1));
  }
}
