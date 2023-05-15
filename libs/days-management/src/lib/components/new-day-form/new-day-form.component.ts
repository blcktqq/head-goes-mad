import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaysFacade } from '../../+state/days.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isBefore, isToday } from 'date-fns';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'hgm-new-day-form',
  templateUrl: './new-day-form.component.html',
  styleUrls: ['./new-day-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDayFormComponent {
  public fg!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private daysFacade: DaysFacade,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      const initialDate = this.isDateBlackisted(new Date()) ? new Date() : null;
      this.fg = this.fb.group({
        date: this.fb.control(initialDate, [Validators.required]),
        description: this.fb.control(''),
      });
      this.cdr.markForCheck();
    });
  }

  private allDays = toSignal(this.daysFacade.allDays$, { initialValue: [] });
  private blackListedDays = computed(
    () => this.allDays().map((d) => d.date) ?? []
  );

  public dateFilterFn = (date: Date | null) => this.isDateBlackisted(date);

  private isDateBlackisted(date: Date | null) {
    if (!date) {
      return false;
    }
    const isOldDate = isBefore(date, new Date()) && !isToday(date);
    return (
      !isOldDate &&
      !this.blackListedDays().some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
      )
    );
  }
}
