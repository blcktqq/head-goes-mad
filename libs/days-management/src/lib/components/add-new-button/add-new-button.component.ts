import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs';
import { DaysFacade } from '../../+state/days.facade';
import { NewDayFormComponent } from '../new-day-form/new-day-form.component';

@Component({
  selector: 'hgm-add-new-button',
  templateUrl: './add-new-button.component.html',
  styleUrls: ['./add-new-button.component.scss'],
})
export class AddNewButtonComponent {
  constructor(private matDialog: MatDialog, private daysFacade: DaysFacade) {}

  openDialog() {
    const ref = this.matDialog.open(NewDayFormComponent);
    ref
      .afterClosed()
      .pipe(
        take(1),
        filter((v) => !!v)
      )
      .subscribe((result) => {
        this.daysFacade.createDay(result.date, result.description);
        this.daysFacade.init()
      });
  }
}
