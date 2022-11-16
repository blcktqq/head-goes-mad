import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayViewComponent } from './today-view.component';

const routes: Routes = [{ path: '', component: TodayViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodayViewRoutingModule { }
