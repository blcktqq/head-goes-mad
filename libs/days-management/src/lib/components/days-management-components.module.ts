import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AddNewButtonComponent } from './add-new-button/add-new-button.component';
import { NewDayFormComponent } from './new-day-form/new-day-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslateModule } from '@ngx-translate/core';
import { DayContainerComponent } from './day-container/day-container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DayContainerItemDirective } from './day-container/day-container-item.directive';
@NgModule({
  declarations: [
    AddNewButtonComponent,
    NewDayFormComponent,
    DayContainerComponent,
    DayContainerItemDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    TranslateModule,
    MatExpansionModule,
  ],
  exports: [AddNewButtonComponent, DayContainerComponent, DayContainerItemDirective],
})
export class DaysManagementComponentsModule {}
