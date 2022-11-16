import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayViewRoutingModule } from './today-view-routing.module';
import { TodayViewComponent } from './today-view.component';


@NgModule({
  declarations: [
    TodayViewComponent
  ],
  imports: [
    CommonModule,
    TodayViewRoutingModule
  ]
})
export class TodayViewModule { }
