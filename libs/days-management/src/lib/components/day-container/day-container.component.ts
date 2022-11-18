import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { concat, min, of } from 'rxjs';
import { DaysEntity } from '../../+state/days.models';
import { DayContainerItemDirective } from './day-container-item.directive';

@Component({
  selector: 'hgm-day-container',
  templateUrl: './day-container.component.html',
  styleUrls: ['./day-container.component.scss'],
})
export class DayContainerComponent implements AfterContentInit {
  @Input() day: DaysEntity | null = null;
  @Output() createTask = new EventEmitter<DaysEntity>();
  @ContentChildren(DayContainerItemDirective, {
    read: DayContainerItemDirective,
  })
  viewChildren!: QueryList<DayContainerItemDirective>;
  public panelOpenState = false;
  ngAfterContentInit(): void {
    concat(of(this.viewChildren, this.viewChildren.changes)).subscribe(
      (changes) => {
        console.log(changes);
      }
    );
  }
  onClick() {
    if (this.day) {
      this.createTask.emit(this.day);
    }
  }
}
