import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { APP_CONFIG_INJECTION_TOKEN } from '@head-goes-mad/common';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: APP_CONFIG_INJECTION_TOKEN,
      useFactory: () => environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
