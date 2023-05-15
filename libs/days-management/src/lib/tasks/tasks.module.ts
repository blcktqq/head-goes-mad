import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslateModule } from '@ngx-translate/core';
import { AddNewTaskButtonComponent, DaysManagementComponentsModule } from '../components';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import { MatDividerModule } from '@angular/material/divider';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { MatIconModule } from '@angular/material/icon';
import { CompleteTaskDialogComponent } from './complete-task-dialog/complete-task-dialog.component';
import { UncompleteTaskDialogComponent } from './uncomplete-task-dialog/uncomplete-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
@NgModule({
  declarations: [
    TaskEditorComponent,
    TaskViewerComponent,
    CompleteTaskDialogComponent,
    UncompleteTaskDialogComponent,
    DeleteTaskDialogComponent,
    AddNewTaskButtonComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatButtonModule,
    DaysManagementComponentsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [TaskEditorComponent, TaskViewerComponent, AddNewTaskButtonComponent],
})
export class TasksModule {}
