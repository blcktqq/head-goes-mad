import { Component, OnInit } from '@angular/core';
import { AppConfig } from '@hgm/common';
import { UserFacade } from '@hgm/user';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'hgm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hgm-ui';
  constructor(
    public userFacade: UserFacade,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // this.translateService.setDefaultLang(
    //   this.translateService.getBrowserLang() ?? 'en'
    // );
    // this.translateService.use(this.translateService.getBrowserLang() ?? 'en');
  }
}
