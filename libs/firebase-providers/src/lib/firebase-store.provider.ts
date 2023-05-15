import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseStoreProvider {
  private firestore = inject(Firestore);
  public getFireStore() {
    return this.firestore;
  }
}
