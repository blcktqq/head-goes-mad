import { Injectable } from '@angular/core';
import { AppConfig } from '@hgm/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
@Injectable({ providedIn: 'root' })
export class FirebaseAppProvider {
  private app: FirebaseApp;
  constructor(private appConfig: AppConfig) {
    this.app = initializeApp(this.appConfig.firebase);
  }

  public getAppProvider() {
    if (!this.app) {
      this.app = initializeApp(this.appConfig.firebase);
    }
    return this.app;
  }
}
