import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '@hgm/firebase-providers';
import { sub } from 'date-fns';
import { get, push, ref } from 'firebase/database';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
export interface IDocData {
  date: string;
  description: string;
  id: string;
  userId: string;
}
@Injectable()
export class DaysmanagementService {
  constructor(private database: FirebaseStoreProvider) {}
  public async createDay(data: {
    description: string;
    date: Date;
    userId: string;
  }) {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `days`);
    const id = crypto.randomUUID();
    const result = await addDoc(collectionRef, {
      date: data.date.toUTCString(),
      description: data.description,
      id,
      userId: data.userId,
    });

    console.log(result);
    return result.id;
  }
  public async getDays(userId: string): Promise<IDocData[]> {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `days`);
    const q = query(collectionRef, where('userId', '==', userId));
    const result = await getDocs(q);
    return result.docs.map(
      (doc) =>
        doc.data() as {
          date: string;
          description: string;
          id: string;
          userId: string;
        }
    );
  }
  public getDays$(userId: string) {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `days`);
    const q = query(collectionRef, where('userId', '==', userId));
    const subject = new Subject<IDocData[]>();
    onSnapshot(
      q,
      (doc) => {
        subject.next(doc.docs.map((d) => d.data() as IDocData));
      },
      () => ({}),
      () => subject.complete()
    );
    return subject.asObservable();
  }
}
