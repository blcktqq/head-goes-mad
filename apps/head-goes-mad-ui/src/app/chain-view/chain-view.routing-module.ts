import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ChainViewComponent } from './chain-view/chain-view.component';

const routes: Routes = [{ path: '', component: ChainViewComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)] })
export class ChainViewRoutingModule {}
