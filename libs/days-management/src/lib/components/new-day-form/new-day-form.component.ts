import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaysFacade } from '../../+state/days.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'hgm-new-day-form',
  templateUrl: './new-day-form.component.html',
  styleUrls: ['./new-day-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class NewDayFormComponent implements OnInit {
  public fg!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private daysFacade: DaysFacade,
    private cdr: ChangeDetectorRef
  ) {}

  private blackListedDays: Date[] = [];
  ngOnInit(): void {
    this.daysFacade.allDays$.pipe(untilDestroyed(this)).subscribe((dates) => {
      this.blackListedDays = dates.map((d) => d.date);
      const initialDate = this.isDateBlackisted(new Date()) ? new Date() : null;
      this.fg = this.fb.group({
        date: this.fb.control(initialDate, [Validators.required]),
        description: this.fb.control(''),
      });
      this.cdr.markForCheck();
    });
  }

  public dateFilterFn = (date: Date | null) => this.isDateBlackisted(date);

  private isDateBlackisted(date: Date | null) {
    if (!date) {
      return false;
    }
    const isOldDate = Date.now() >= date.getTime()
    return (
      !isOldDate &&
      !this.blackListedDays.some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          date.getDate() === d.getDate()
      )
    );
  }
}
