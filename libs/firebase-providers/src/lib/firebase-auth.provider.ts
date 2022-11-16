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
import { ISignedInUser } from '@head-goes-mad/common';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  private auth = getAuth(this.app.getAppProvider());
  private googleProvider = new GoogleAuthProvider();
  private authStateChangeSubjects = new ReplaySubject<User | null>(1);
  constructor(private app: FirebaseAppProvider) {
    // this.googleProvider.addScope(
    //   'https://www.googleapis.com/auth/contacts.readonly'
    // );
    this.auth.languageCode = 'ua';
    getRedirectResult(this.auth).then((res) => {
      console.log(res?.user);
      console.log(res);
      if (res?.user) {
        this.authStateChangeSubjects.next(res.user ?? null);
      }
    });
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      this.authStateChangeSubjects.next(user);
    });
  }

  public get getUser$() {
    return this.authStateChangeSubjects.asObservable();
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
        console.log(redirectResult);
      } else {
        const signInResult = await signInWithRedirect(
          this.auth,
          this.googleProvider
        );
        console.log(signInResult);
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
