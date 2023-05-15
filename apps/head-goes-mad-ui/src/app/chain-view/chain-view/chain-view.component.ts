import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';

import {
  DaysEntity,
  DaysFacade,
  TaskEditorComponent,
  TasksEntity,
  TasksFacade,
} from '@hgm/days-management';
import { map, of } from 'rxjs';

@Component({
  selector: 'hgm-chain-view',
  templateUrl: './chain-view.component.html',
  styleUrls: ['./chain-view.component.scss'],
})
export class ChainViewComponent implements OnInit {
  constructor(
    private daysFacade: DaysFacade,
    private tasksFacade: TasksFacade,
    private matDialog: MatDialog
  ) {}

  // public days$ = this.daysFacade.ongoingDays$;
  public heap$ = this.daysFacade.heap$;

  ngOnInit(): void {
    this.daysFacade.init();
    this.tasksFacade.init();
  }
  public getTasksPerDay$(id: string | null) {
    return this.tasksFacade.getTasksPerDay(id);
  }
  createTask(day: DaysEntity) {
    const config = new MatDialogConfig();
    config.data = { dateId: day.id };
    const ref = this.matDialog.open(TaskEditorComponent, config);
    ref.afterClosed().subscribe((data: TasksEntity) => {
      if (data) {
        this.tasksFacade.createTask({
          ...data,
          dateId: data.dateId === 'heap' ? null : data.dateId,
        });
      }
    });
  }
}
