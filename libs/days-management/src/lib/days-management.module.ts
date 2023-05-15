import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DaysEffects } from './+state/days.effects';
import * as fromDays from './+state/days.reducer';
import { DaysmanagementService } from './+state/services/days-managemenet.service';
import { TaskApiService } from './+tasks/services/task-api.service';
import { TasksEffects } from './+tasks/tasks.effects';
import * as fromTasks from './+tasks/tasks.reducer';

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
