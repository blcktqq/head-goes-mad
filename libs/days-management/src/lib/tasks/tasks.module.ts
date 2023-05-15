import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import {
  AddNewTaskButtonComponent,
  DaysManagementComponentsModule,
} from '../components';
import { MatCardModule } from '@angular/material/card';
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
  exports: [
    TaskEditorComponent,
    TaskViewerComponent,
    AddNewTaskButtonComponent,
  ],
})
export class TasksModule {}
