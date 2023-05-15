import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { DaysEntity, DaysFacade, TaskEditorComponent, TasksEntity, TasksFacade } from '@hgm/days-management';

@Component({
  selector: 'hgm-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.scss'],
})
export class TodayViewComponent implements OnInit {
  public today$ = this.daysFacade.today$;

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
