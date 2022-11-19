import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '@hgm/firebase-providers';
import { sub } from 'date-fns';
import { get, push, ref } from 'firebase/database';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
export interface IDocData {
  date: Date;
  description: string;
  id: string;
  userId: string;
  createdAt: Date;
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

    const result = await addDoc(collectionRef, {
      date: data.date,
      description: data.description,
      userId: data.userId,
      createdAt: serverTimestamp(),
    });
    return result.id;
  }
  public async getDays(userId: string): Promise<IDocData[]> {
    const result = await getDocs(this.getDocsRef(userId));
    return this.mapDocs(result);
  }
  public getDays$(userId: string) {
    const subject = new Subject<IDocData[]>();
    onSnapshot(
      this.getDocsRef(userId),
      (doc) => {
        subject.next(this.mapDocs(doc));
      },
      () => ({}),
      () => subject.complete()
    );
    return subject.asObservable();
  }
  private mapDocs(snapshot: QuerySnapshot<DocumentData>) {
    return snapshot.docs.map((d) => {
      const data = d.data();

      return {
        ...d.data(),
        createdAt: data['createdAt']?.toDate(),
        date: data['date']?.toDate(),
        id: d.id,
      } as IDocData;
    });
  }

  private getDocsRef(userId: string) {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `days`);
    const q = query(
      collectionRef,
      where('userId', '==', userId),
      orderBy('date', 'asc')
    );
    return q;
  }
}
