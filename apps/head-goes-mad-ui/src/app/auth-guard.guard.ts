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
import { Observable, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard {
  constructor(private userFacade: UserFacade, private router: Router) {}
  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
  canActivate(): Observable<boolean> {
    return this.isUserLoaded().pipe(
      map((result) => {
        if (!result) {
          this.router.navigate(['/auth']);
        }
        return result;
      })
    );
  }

  private isUserLoaded() {
    return this.userFacade.isUserLoaded$.pipe(
      take(1),
      map((v) => !!v),
    );
  }
}
