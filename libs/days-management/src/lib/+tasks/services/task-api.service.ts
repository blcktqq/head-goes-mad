import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '@hgm/firebase-providers';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
import { TasksEntity } from '../tasks.models';
export interface ITask {
  id: string;
  title: string;
  description: string;
  dateId: string | null;
  userId: string;
}
@Injectable()
export class TaskApiService {
  constructor(private database: FirebaseStoreProvider) {}
  public async createTask(data: Partial<TasksEntity>, userId: string) {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `tasks`);
    const id = crypto.randomUUID();
    const result = await addDoc(collectionRef, {
      description: data.description,
      id,
      dateId: data.dateId,
      title: data.title,
      userId,
    } as ITask);

    return result.id;
  }
  public async getTasks(userId: string): Promise<ITask[]> {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `tasks`);
    const q = query(collectionRef, where('userId', '==', userId));
    const result = await getDocs(q);
    return result.docs.map((doc) => doc.data() as ITask);
  }
  public getTasks$(userId: string) {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `tasks`);
    const q = query(collectionRef, where('userId', '==', userId));
    const subject = new Subject<ITask[]>();
    onSnapshot(
      q,
      (doc) => {
        subject.next(doc.docs.map((d) => d.data() as ITask));
      },
      () => ({}),
      () => subject.complete()
    );
    return subject.asObservable();
  }
}
