import { CommonModule } from '@angular/common';
// import { HomeComponent } from './../home/home.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ConfigurationService } from './services/configuration.service';
import { DataService } from './services/data.service';
import {ModuleWithProviders, NgModule, NgZone} from '@angular/core';
import {SpinnerInterceptor} from './spinner-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {PrefixPipe, SuffixPipe} from './pipes/suffix.pipe';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FileOnlyUploaderComponent} from './components/file-only-uploader/file-only-uploader.component';
import {MatCardModule} from '@angular/material/card';
import {TrueFalseIconComponent} from './components/true-false-icon/true-false-icon.component';
import {SignaturePadComponent} from './components/signiture-pad/signature-pad.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';
import {VehicleBodyDamageDiagramComponent} from './components/vehicle-body-damage-diagram/vehicle-body-damage-diagram.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {CarouselDuplicateDirective} from './components/carousel/carousel-duplicate.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule
  ],

declarations: [
  SuffixPipe, PrefixPipe, FileUploadComponent, FileOnlyUploaderComponent, ImageUploadComponent, TrueFalseIconComponent,
  SignaturePadComponent, VehicleBodyDamageDiagramComponent, CarouselComponent, CarouselDuplicateDirective
],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SuffixPipe,
    PrefixPipe,
    FileUploadComponent,
    ImageUploadComponent,
    TrueFalseIconComponent,
    CarouselComponent,
    CarouselDuplicateDirective,
  ],
// bootstrap: [HomeComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
              MatSnackBarModule,
                DataService, SuffixPipe, PrefixPipe,
                ConfigurationService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: SpinnerInterceptor,
                multi: true,
              },
            ]
        };
    }
}
