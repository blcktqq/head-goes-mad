import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Injectable()
export class TaskEditorService {
  constructor(private matDialog: MatDialog) {}

  openTaskEditor() {
    return this.matDialog.open(TaskEditorComponent);
  }
}
