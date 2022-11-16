import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainViewComponent } from './chain-view/chain-view.component';
import { ChainViewRoutingModule } from './chain-view.routing-module';

@NgModule({
  declarations: [ChainViewComponent],
  imports: [CommonModule, ChainViewRoutingModule],
  exports: [ChainViewComponent],
})
export class ChainViewModule {}
