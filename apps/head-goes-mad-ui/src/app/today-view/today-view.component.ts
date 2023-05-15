import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DaysFacade, TasksFacade } from '@hgm/days-management';

@Component({
  selector: 'hgm-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.scss'],
})
export class TodayViewComponent implements OnInit {
  public today = this.daysFacade.today;

  constructor(
    private daysFacade: DaysFacade,
    private tasksFacade: TasksFacade
  ) {}

  ngOnInit() {
    this.daysFacade.init();
    this.tasksFacade.init();
  }

  public getTasksPerDay$(id: string | null) {
    return this.tasksFacade.getTasksPerDay(id);
  }
}
