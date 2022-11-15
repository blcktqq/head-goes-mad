import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IAppConfig, IFirebaseConfig } from './app-config.interface';

@Injectable({ providedIn: 'root' })
export class AppConfig implements IAppConfig {
  readonly production!: boolean;
  readonly firebase!: IFirebaseConfig;
  constructor(@Inject(APP_CONFIG_INJECTION_TOKEN) app: IAppConfig) {
    this.firebase = app.firebase;
    this.production = app.production;
  }
}
export const APP_CONFIG_INJECTION_TOKEN = new InjectionToken<IAppConfig>(
  'AppConfigInjectionToken',
  {
    providedIn: 'root',
    factory: () => {
      throw new Error('Token not defined');
    },
  }
);
