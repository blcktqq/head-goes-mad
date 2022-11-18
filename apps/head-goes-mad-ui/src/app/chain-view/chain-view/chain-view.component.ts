import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {
  DaysEntity,
  DaysFacade,
  TaskEditorComponent,
} from '@hgm/days-management';
import { map } from 'rxjs';

@Component({
  selector: 'hgm-chain-view',
  templateUrl: './chain-view.component.html',
  styleUrls: ['./chain-view.component.scss'],
})
export class ChainViewComponent implements OnInit {
  constructor(private daysFacade: DaysFacade, private matDialog: MatDialog) {}

  public days$ = this.daysFacade.allDays$.pipe(
    map((days) => days.filter((d) => !d.isHeap))
  );
  public heap$ = this.daysFacade.allDays$.pipe(
    map((days) => days.find((d) => d.isHeap) ?? null)
  );
  ngOnInit(): void {
    this.daysFacade.init();
  }
  createTask(day: DaysEntity) {
    const config = new MatDialogConfig();
    config.data = day;
    this.matDialog.open(TaskEditorComponent, config);
  }
}
