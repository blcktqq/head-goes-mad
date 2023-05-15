import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DaysFacade,
  DaysManagementComponentsModule,
  TasksFacade,
  TasksModule,
} from '@hgm/days-management';

@Component({
  selector: 'hgm-future-view',
  standalone: true,
  imports: [CommonModule, DaysManagementComponentsModule, TasksModule],
  template: ` <div class="flex w-full justify-end">
      <hgm-add-new-button class="m-1 pr-2"></hgm-add-new-button>
      <hgm-add-new-task-button class="m-1 pr-2"></hgm-add-new-task-button>
    </div>
    <hgm-day-container
      [shouldCreateTasks]="true"
      [tasks]="getTasksPerDay(day.id)()"
      [day]="day"
      *ngFor="let day of days()"
    >
      <hgm-task-viewer
        class="m-4"
        hgmDayContainerItem
        *ngFor="let item of getTasksPerDay(day.id)()"
        [task]="item"
      ></hgm-task-viewer>
    </hgm-day-container>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureViewComponent implements OnInit {
  private daysFacade = inject(DaysFacade);
  private tasksFacade = inject(TasksFacade);
  public days = this.daysFacade.futureDays;
  public getTasksPerDay(id: string | null) {
    return this.tasksFacade.getTasksPerDaySignal(id);
  }
  ngOnInit() {
    this.daysFacade.init();
    this.tasksFacade.init();
  }
}
