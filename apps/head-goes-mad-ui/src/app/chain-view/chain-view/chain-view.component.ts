import { Component, OnInit } from '@angular/core';
import { DaysFacade } from '@head-goes-mad/days-management';

@Component({
  selector: 'head-goes-mad-chain-view',
  templateUrl: './chain-view.component.html',
  styleUrls: ['./chain-view.component.scss'],
})
export class ChainViewComponent implements OnInit {
  constructor(private daysFacade: DaysFacade) {}

  ngOnInit(): void {
    this.daysFacade.init()
  }
}
