import { Component, Input, OnInit } from '@angular/core';
import { min } from 'rxjs';
import { DaysEntity } from '../../+state/days.models';

@Component({
  selector: 'hgm-day-container',
  templateUrl: './day-container.component.html',
  styleUrls: ['./day-container.component.scss'],
})
export class DayContainerComponent implements OnInit {
  @Input() day: DaysEntity | null = null;
  public panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
