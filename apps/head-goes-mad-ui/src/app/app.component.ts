import { Component, OnInit } from '@angular/core';
import { AppConfig } from '@head-goes-mad/common';
import { UserFacade } from '@head-goes-mad/user';
@Component({
  selector: 'head-goes-mad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'head-goes-mad-ui';
  constructor(public userFacade: UserFacade) {}

  ngOnInit(): void {
    console.log('Hello world');
  }
}
