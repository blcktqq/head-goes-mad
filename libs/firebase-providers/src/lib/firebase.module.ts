import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppConfig } from '@hgm/common';
const modules = [
  provideFirebaseApp((injector) => {
    const confing = injector.get(AppConfig);
    const app = initializeApp(confing.firebase);
    return app;
  }),
  provideAuth(() => getAuth()),
  provideFirestore(()=>getFirestore())
];

export const FIREBASE_PROVIDERS = [...modules];
