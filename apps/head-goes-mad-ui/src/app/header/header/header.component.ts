import { Component, OnInit } from '@angular/core';
import { UserFacade } from '@hgm/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'hgm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public userFacade: UserFacade,
    private breakPointObserver: BreakpointObserver
  ) {}

  public isExtraSmall = this.breakPointObserver
    .observe([Breakpoints.XSmall])
    .pipe(map((value) => value.matches));
  ngOnInit(): void {
    console.log('wow');
  }

  public signout() {
    this.userFacade.signOut();
  }
}
