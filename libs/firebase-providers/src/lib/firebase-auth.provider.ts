import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  user,
} from '@angular/fire/auth';
import { ISignedInUser } from '@hgm/common';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  private auth = inject(Auth);
  private googleProvider = new GoogleAuthProvider();
  private authStateChangeSubjects = user(this.auth)
  private authStateChange = toSignal(this.authStateChangeSubjects);
  constructor() {
    this.auth.languageCode = 'ua';
  }

  public get getUser$() {
    return this.authStateChangeSubjects;
  }
  public get user() {
    return this.authStateChange;
  }

  public getUser(): ISignedInUser | null {
    const u = this.user();
    if (!u) {
      return null;
    }
    return { id: u.uid, name: u.displayName ?? '', photo: u.photoURL ?? '' };
  }

  public async login() {
    try {
      const redirectResult = await getRedirectResult(this.auth);
      // eslint-disable-next-line no-empty
      if (redirectResult) {
      } else {
        await signInWithRedirect(this.auth, this.googleProvider);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  public async logout() {
    await this.auth.signOut();
    location.reload();
  }
}
