import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthProvider } from '@hgm/firebase-providers';
import { filter, take } from 'rxjs';

@Component({
  selector: 'hgm-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private authProvider: FirebaseAuthProvider,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authProvider.getUser$
      .pipe(
        filter((v) => !!v),
        take(1)
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
  signinWithGoogle() {
    this.authProvider.login();
  }
}
