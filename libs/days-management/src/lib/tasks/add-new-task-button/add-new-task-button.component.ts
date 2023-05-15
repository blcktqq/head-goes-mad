import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { filter, take } from 'rxjs';
import { TasksFacade } from '../../+tasks/tasks.facade';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'hgm-add-new-task-button',
  templateUrl: './add-new-task-button.component.html',
  styleUrls: ['./add-new-task-button.component.scss'],
})
export class AddNewTaskButtonComponent {
  @Input() dateId: string | null = 'heap';
  constructor(private matDialog: MatDialog, private tasksFacade: TasksFacade) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.data = { dateId: this.dateId };
    const ref = this.matDialog.open(TaskEditorComponent, config);
    ref
      .afterClosed()
      .pipe(
        take(1),
        filter((v) => !!v)
      )
      .subscribe((data) => {
        console.log(data);
        if (data) {
          this.tasksFacade.createTask({
            ...data,
            dateId: data.dateId === 'heap' ? null : data.dateId,
          });
        }
      });
  }
}
