import { Component, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { TaskStatusEnum } from '../../+tasks/services/task-api.service';
import { TasksFacade } from '../../+tasks/tasks.facade';
import { TasksEntity } from '../../+tasks/tasks.models';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { UncompleteTaskDialogComponent } from '../uncomplete-task-dialog/uncomplete-task-dialog.component';

@Component({
  selector: 'hgm-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrls: ['./task-viewer.component.scss'],
})
export class TaskViewerComponent {
  @Input()
  public task!: TasksEntity;
  public TaskStatusEnum = TaskStatusEnum;
  constructor(private matDialog: MatDialog, private taskFacade: TasksFacade) {}

  public complete() {
    const ref = this.matDialog.open(CompleteTaskDialogComponent);
    ref.afterClosed().subscribe((isOk) => {
      if (isOk) {
        this.taskFacade.updateTask(this.task.id, {
          status: TaskStatusEnum.Completed,
        });
      }
    });
  }

  public uncomplete() {
    const ref = this.matDialog.open(UncompleteTaskDialogComponent);
    ref.afterClosed().subscribe((isOk) => {
      if (isOk) {
        this.taskFacade.updateTask(this.task.id, {
          status: TaskStatusEnum.Created,
        });
      }
    });
  }
  public edit() {
    const config = new MatDialogConfig();
    config.data = this.task;
    const ref = this.matDialog.open(TaskEditorComponent, config);
    ref.afterClosed().subscribe((data: TasksEntity) => {
      if (data) {
        this.taskFacade.updateTask(this.task.id, {
          ...data,
          dateId: data.dateId === 'heap' ? null : data.dateId,
        });
      }
    });
  }

  public delete() {
    const ref = this.matDialog.open(DeleteTaskDialogComponent);
    ref.afterClosed().subscribe((isOk) => {
      if (isOk) {
        this.taskFacade.deleteTask(this.task.id);
      }
    });
  }
}
