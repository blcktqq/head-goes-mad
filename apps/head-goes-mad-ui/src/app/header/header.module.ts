import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    RouterModule,
    MatMenuModule,
    TranslateModule,
  ],
})
export class HeaderModule {}
