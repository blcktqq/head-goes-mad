import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDays from './+state/days.reducer';
import { DaysEffects } from './+state/days.effects';
import * as fromTasks from './+tasks/tasks.reducer';
import { TasksEffects } from './+tasks/tasks.effects';
import { TasksFacade } from './+tasks/tasks.facade';
import { DaysmanagementService } from './+state/services/days-managemenet.service';
import { TaskApiService } from './+tasks/services/task-api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDays.DAYS_FEATURE_KEY, fromDays.daysReducer),
    EffectsModule.forFeature([DaysEffects]),
    StoreModule.forFeature(fromTasks.TASKS_FEATURE_KEY, fromTasks.tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
  ],
  providers: [DaysmanagementService, TaskApiService],
})
export class DaysManagementModule {}
