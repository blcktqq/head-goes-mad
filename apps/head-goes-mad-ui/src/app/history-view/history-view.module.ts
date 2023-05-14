import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryViewRoutingModule } from './history-view-routing.module';
import { HistoryViewComponent } from './history-view.component';
import { DaysManagementComponentsModule, TasksModule } from '@hgm/days-management';


@NgModule({
  declarations: [
    HistoryViewComponent
  ],
  imports: [
    CommonModule,
    HistoryViewRoutingModule,
    DaysManagementComponentsModule,
    TasksModule,
  ]
})
export class HistoryViewModule { }
