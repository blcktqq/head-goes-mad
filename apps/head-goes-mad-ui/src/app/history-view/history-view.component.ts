import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { DaysFacade, TasksFacade } from '@hgm/days-management';

@Component({
  selector: 'hgm-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
})
export class HistoryViewComponent implements OnInit {
  public days = toSignal(this.daysFacade.outdatedDays$);

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
