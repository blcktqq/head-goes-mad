import { Component } from '@angular/core';
import { AppConfig } from '@head-goes-mad/common';

@Component({
  selector: 'head-goes-mad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'head-goes-mad-ui';
  constructor(public appConfig: AppConfig) {}
}
