import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaysEntity, DaysFacade, TaskEditorComponent, TasksEntity, TasksFacade } from '@hgm/days-management';

@Component({
  selector: 'hgm-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
})
export class HistoryViewComponent implements OnInit {
  public days$ = this.daysFacade.outdatedDays$;
  // public heap$ = this.daysFacade.heap$;

  constructor(private daysFacade: DaysFacade,private tasksFacade: TasksFacade,
    private matDialog: MatDialog) {}

  ngOnInit() {
    this.daysFacade.init();
    this.tasksFacade.init();
  }

  public getTasksPerDay$(id: string | null) {
    return this.tasksFacade.getTasksPerDay(id);
  }
}
