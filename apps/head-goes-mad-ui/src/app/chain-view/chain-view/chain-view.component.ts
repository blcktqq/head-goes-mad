import { Component, OnInit } from '@angular/core';

import { DaysEntity, DaysFacade } from '@hgm/days-management';
import { map } from 'rxjs';

@Component({
  selector: 'hgm-chain-view',
  templateUrl: './chain-view.component.html',
  styleUrls: ['./chain-view.component.scss'],
})
export class ChainViewComponent implements OnInit {
  constructor(private daysFacade: DaysFacade) {}

  public days$ = this.daysFacade.allDays$.pipe(
    map((days) => days.filter((d) => !d.isHeap))
  );
  public heap$ = this.daysFacade.allDays$.pipe(
    map((days) => days.find((d) => d.isHeap) ?? null)
  );
  ngOnInit(): void {
    this.daysFacade.init();
  }
}
