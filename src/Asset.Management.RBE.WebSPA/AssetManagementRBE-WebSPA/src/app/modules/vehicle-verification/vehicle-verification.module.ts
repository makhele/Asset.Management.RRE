import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleVerificationService} from './vehicle-verification.service';
import {VehicleVerifyComponent} from './vehicle-verify/vehicle-verify.component';
import {VehicleVerificationRoutesModules} from './vehicle-verification.routing';
import {MatTableModule} from '@angular/material/table';
import {NbCardModule} from '@nebular/theme';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {VerifyVehicleOnlyComponent} from './verify-vehicle-only/verify-vehicle-only.component';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ImageUploadOnlyComponent} from './image-upload-only/image-upload-only.component';
import {SharedModule} from '../shared/shared.module';
import {VehicleAndPhotoComponent} from './vehicle-and-photo/vehicle-and-photo.component';
import {MatStepperModule} from '@angular/material/stepper';
import {VerifiedVehiclesComponent} from './verified-vehicles/verified-vehicles.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {VehicleDetailComponent} from './vehicle-detail/vehicle-detail.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  imports: [
    VehicleVerificationRoutesModules,
    CommonModule,
    MatTableModule,
    NbCardModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    SharedModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  declarations: [VehicleVerifyComponent, VerifyVehicleOnlyComponent, ImageUploadOnlyComponent, VehicleAndPhotoComponent,
    VerifiedVehiclesComponent, VehicleDetailComponent],
  providers: [VehicleVerificationService]
})
export class VehicleVerificationModule { }
