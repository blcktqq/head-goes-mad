import { Component, OnInit } from '@angular/core';
import { DaysFacade } from '@hgm/days-management';

@Component({
  selector: 'hgm-chain-view',
  templateUrl: './chain-view.component.html',
  styleUrls: ['./chain-view.component.scss'],
})
export class ChainViewComponent implements OnInit {
  constructor(private daysFacade: DaysFacade) {}

  ngOnInit(): void {
    this.daysFacade.init()
  }
}
