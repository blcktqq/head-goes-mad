import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '@hgm/firebase-providers';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  QuerySnapshot,
  DocumentData,
  serverTimestamp,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
import { TasksEntity } from '../tasks.models';
export enum TaskStatusEnum {
  Created,
  Completed,
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  dateId: string | null;
  userId: string;
  status: TaskStatusEnum;
  createdAt: Date;
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
      status: TaskStatusEnum.Created,
      createdAt: serverTimestamp(),
    });

    return result.id;
  }
  public async updateTask(id: string, task: Partial<ITask>) {
    console.log('What am I doing here?', task);
    const db = this.database.getFireStore();
    const ref = doc(db, 'tasks', id);
    await updateDoc(ref, { ...task, updatedAt: serverTimestamp() });
  }
  public async getTasks(userId: string): Promise<ITask[]> {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `tasks`);
    const q = query(collectionRef, where('userId', '==', userId));
    const result = await getDocs(q);
    return this.mapData(result);
  }
  public getTasks$(userId: string) {
    const subject = new Subject<ITask[]>();
    onSnapshot(
      this.getTasksQuery(userId),
      (doc) => {
        subject.next(this.mapData(doc));
      },
      () => ({}),
      () => subject.complete()
    );
    return subject.asObservable();
  }

  private getTasksQuery(userId: string) {
    const db = this.database.getFireStore();
    const collectionRef = collection(db, `tasks`);
    const q = query(collectionRef, where('userId', '==', userId));
    return q;
  }

  private mapData(snapshot: QuerySnapshot<DocumentData>) {
    return snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as ITask));
  }
}
