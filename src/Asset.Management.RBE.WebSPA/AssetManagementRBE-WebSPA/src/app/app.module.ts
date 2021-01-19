/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import {AppRoutingModule, routes} from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule, NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {PagesModule} from './modules/pages/pages.module';
import {SharedModule} from './modules/shared/shared.module';
import {HomeModule} from './modules/home/home.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotificationModule} from './@theme/components/notification/notification.module';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SuffixPipe} from './modules/shared/pipes/suffix.pipe';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material/dialog';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {VehicleVerificationModule} from './modules/vehicle-verification/vehicle-verification.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AssetRegisterModule} from './modules/asset-register/asset-register.module';
import {LoginModule} from './modules/auth/login.module';
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    // for HttpClient use:
    LoadingBarHttpClientModule,

    // for Router use:
    LoadingBarRouterModule,
    // for Core use:
    LoadingBarModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    PagesModule,
    HomeModule,
    SharedModule.forRoot(),
    NbLayoutModule,
    MatSnackBarModule,
    NotificationModule,
    MatProgressBarModule,
    //for the new App
    VehicleVerificationModule,
    AssetRegisterModule,
    LoginModule

  ],
  bootstrap: [AppComponent],
  exports: [
  ],
  providers:[
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
      ...new MatDialogConfig(),
        maxWidth: '75vw',
        maxHeight: '100vh',
      } as MatDialogConfig
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
    }
]
})
export class AppModule {
}
