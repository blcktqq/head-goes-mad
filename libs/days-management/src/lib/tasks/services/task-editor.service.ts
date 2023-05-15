import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Injectable()
export class TaskEditorService {
  constructor(private matDialog: MatDialog) {}

  openTaskEditor() {
    return this.matDialog.open(TaskEditorComponent);
  }
}
