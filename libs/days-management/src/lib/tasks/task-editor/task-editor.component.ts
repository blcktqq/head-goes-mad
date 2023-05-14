import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DaysFacade } from '../../+state/days.facade';
import { TasksEntity } from '../../+tasks/tasks.models';

@Component({
  selector: 'hgm-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss'],
})
export class TaskEditorComponent implements OnInit {
  constructor(
    private daysFacade: DaysFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: TasksEntity
  ) {}
  public maxTitleLength = 64;
  public maxDescriptionLength = 1000;
  public fg!: FormGroup<{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    dateId: FormControl<string | null>;
  }>;
  public futureDates$ = this.daysFacade.ongoingDays$.pipe(
    map((dates) =>
      dates.map((d) => ({
        id: d.id,
        value: d.date,
      }))
    )
  );
  public getControl(name: string) {
    return this.fg?.get(name);
  }
  ngOnInit(): void {
    this.fg = this.fb.group({
      title: this.fb.control(this.data?.title ?? '', [
        Validators.required,
        Validators.maxLength(this.maxTitleLength),
      ]),
      description: this.fb.control(
        this.data?.description ?? '',
        Validators.maxLength(this.maxDescriptionLength)
      ),
      dateId: this.fb.control<string | null>(this.data?.dateId ?? null, [
        Validators.required,
      ]),
    });
  }
}
