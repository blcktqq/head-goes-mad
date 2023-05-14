import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayViewRoutingModule } from './today-view-routing.module';
import { TodayViewComponent } from './today-view.component';
import { DaysManagementComponentsModule, TasksModule } from '@hgm/days-management';


@NgModule({
  declarations: [
    TodayViewComponent
  ],
  imports: [
    CommonModule,
    TodayViewRoutingModule,
    DaysManagementComponentsModule,
    TasksModule,
  ]
})
export class TodayViewModule { }
