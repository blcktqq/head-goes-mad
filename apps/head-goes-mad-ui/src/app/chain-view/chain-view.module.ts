import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainViewComponent } from './chain-view/chain-view.component';
import { ChainViewRoutingModule } from './chain-view.routing-module';
import { DaysManagementComponentsModule } from '@head-goes-mad/days-management';

@NgModule({
  declarations: [ChainViewComponent],
  imports: [
    CommonModule,
    ChainViewRoutingModule,
    DaysManagementComponentsModule,
  ],
  exports: [ChainViewComponent],
})
export class ChainViewModule {}
