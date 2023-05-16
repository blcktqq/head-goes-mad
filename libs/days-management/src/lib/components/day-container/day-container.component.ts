import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { DaysEntity } from '../../+state/days.models';
import { TaskStatusEnum } from '../../+tasks/services/task-api.service';
import { TasksEntity } from '../../+tasks/tasks.models';
import { DayContainerItemDirective } from './day-container-item.directive';

@Component({
  selector: 'hgm-day-container',
  templateUrl: './day-container.component.html',
  styleUrls: ['./day-container.component.scss'],
})
export class DayContainerComponent implements AfterContentInit {
  @Input() day: DaysEntity | null = null;
  @Input() tasks: TasksEntity[] | null = [];
  @Input() shouldCreateTasks = true;
  @Output() createTask = new EventEmitter<DaysEntity>();
  @ContentChildren(DayContainerItemDirective, {
    read: DayContainerItemDirective,
  })
  viewChildren!: QueryList<DayContainerItemDirective>;
  public panelOpenState = false;
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterContentInit(): void {
    /** empty line; */
    // concat(of(this.viewChildren, this.viewChildren.changes)).subscribe(
    //   (changes) => {
    //   }
    // );
  }
  public get completedTasks() {
    return this.tasks?.filter((t) => t.status === TaskStatusEnum.Completed);
  }
  onClick() {
    if (this.day) {
      this.createTask.emit(this.day);
    }
  }
}
