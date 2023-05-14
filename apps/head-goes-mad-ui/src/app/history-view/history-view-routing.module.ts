import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryViewComponent } from './history-view.component';

const routes: Routes = [{ path: '', component: HistoryViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryViewRoutingModule { }
