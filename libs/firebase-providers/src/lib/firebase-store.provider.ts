import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider } from './firebase-app.provider';

@Injectable({ providedIn: 'root' })
export class FirebaseStoreProvider {
  constructor(private appProvider: FirebaseAppProvider) {}
  public getFireStore() {
    return getFirestore(this.appProvider.getAppProvider());
  }
}
