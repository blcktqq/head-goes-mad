import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG_INJECTION_TOKEN } from '@hgm/common';
import { UserModule } from '@hgm/user';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './app.router-module';
import { DaysManagementModule } from '@hgm/days-management';
import { FIREBASE_PROVIDERS } from '@hgm/firebase-providers';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    UserModule,
    DaysManagementModule,
    BrowserAnimationsModule,
    HeaderModule,
    RouterModule,
    AppRouterModule,
    FIREBASE_PROVIDERS
  ],
  providers: [
    {
      provide: APP_CONFIG_INJECTION_TOKEN,
      useFactory: () => environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
