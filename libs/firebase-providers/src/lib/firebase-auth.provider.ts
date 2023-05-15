import { Injectable } from '@angular/core';
import { FirebaseAppProvider } from './firebase-app.provider';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  User,
  getRedirectResult,
  signInWithPopup,
} from 'firebase/auth';
import { firstValueFrom, ReplaySubject, take } from 'rxjs';
import { ISignedInUser } from '@hgm/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  private auth = getAuth(this.app.getAppProvider());
  private googleProvider = new GoogleAuthProvider();
  private authStateChangeSubjects = new ReplaySubject<User | null>(1);
  private authStateChange = toSignal(this.authStateChangeSubjects.asObservable())
  constructor(private app: FirebaseAppProvider) {
    this.auth.languageCode = 'ua';
    getRedirectResult(this.auth).then((res) => {
      if (res?.user) {
        this.authStateChangeSubjects.next(res.user ?? null);
      }
    });
    onAuthStateChanged(this.auth, (user) => {
      this.authStateChangeSubjects.next(user);
    });
  }

  public get getUser$() {
    return this.authStateChangeSubjects.asObservable();
  }
  public get user() {
    console.log(this.authStateChange())
    return this.authStateChange
  }

  public async getUser(): Promise<ISignedInUser | null> {
    const u = await firstValueFrom(
      this.authStateChangeSubjects.asObservable().pipe(take(1))
    );
    if (!u) {
      return null;
    }
    return { id: u.uid, name: u.displayName ?? '', photo: u.photoURL ?? '' };
  }

  public async login() {
    try {
      const redirectResult = await getRedirectResult(this.auth);
      if (redirectResult) {
      } else {
        const signInResult = await signInWithRedirect(
          this.auth,
          this.googleProvider
        );
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
