import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'chain',
    loadChildren: () => {
      return import('./chain-view/chain-view.module').then(
        (m) => m.ChainViewModule
      );
    },
  },
  {
    path: 'today',
    loadChildren: () =>
      import('./today-view/today-view.module').then((m) => m.TodayViewModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRouterModule {}
