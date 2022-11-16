import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardGuard } from './auth-guard.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full',
  },
  {
    path: 'chain',
    canActivate: [AuthGuardGuard],
    canActivateChild: [AuthGuardGuard],
    loadChildren: () => {
      return import('./chain-view/chain-view.module').then(
        (m) => m.ChainViewModule
      );
    },
  },
  {
    path: 'today',
    canActivate: [AuthGuardGuard],
    canActivateChild: [AuthGuardGuard],
    loadChildren: () =>
      import('./today-view/today-view.module').then((m) => m.TodayViewModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRouterModule {}
