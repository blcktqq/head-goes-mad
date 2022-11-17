import { Component, OnInit } from '@angular/core';
import { AppConfig } from '@hgm/common';
import { UserFacade } from '@hgm/user';
@Component({
  selector: 'hgm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hgm-ui';
  constructor(public userFacade: UserFacade) {}

  ngOnInit(): void {
    console.log('Hello world');
  }
}
