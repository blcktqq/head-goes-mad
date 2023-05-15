import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    TranslateModule,
    MatButtonModule,
  ],
})
export class AuthenticationModule {}
