import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainViewComponent } from './chain-view/chain-view.component';
import { ChainViewRoutingModule } from './chain-view.routing-module';
import {
  AddNewTaskButtonComponent,
  DaysManagementComponentsModule,
  TasksModule,
} from '@hgm/days-management';

@NgModule({
  declarations: [ChainViewComponent],
  imports: [
    CommonModule,
    ChainViewRoutingModule,
    DaysManagementComponentsModule,
    TasksModule,
  ],
  exports: [ChainViewComponent],
})
export class ChainViewModule {}
