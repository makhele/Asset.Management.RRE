import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { PagesComponent } from './pages.component';
import { RouterModule} from '@angular/router';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    RouterModule,
    // DashboardModule,
    // ECommerceModule,
    // MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule {
}
