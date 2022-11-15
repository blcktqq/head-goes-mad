import { Injectable } from '@angular/core';
import { FirebaseAppProvider } from './firebase-app.provider';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { firstValueFrom, Observable, ReplaySubject, take } from 'rxjs';
import { ISignedInUser } from '@head-goes-mad/common';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  private auth = getAuth(this.app.getAppProvider());
  private googleProvider = new GoogleAuthProvider();
  private authStateChangeSubjects = new ReplaySubject<User | null>(1);
  constructor(private app: FirebaseAppProvider) {
    this.googleProvider.addScope(
      'https://www.googleapis.com/auth/contacts.readonly'
    );
    this.auth.languageCode = 'ua';
    onAuthStateChanged(this.auth, (user) => {
      this.authStateChangeSubjects.next(user);
    });
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
    await signInWithRedirect(this.auth, this.googleProvider);
  }
  public async logout() {
    await this.auth.signOut();
  }
}
