import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetRegisterRoutesModules } from './asset-register.routing';
import {AssetRegisterService} from './asset-register.service';
import {AssetRegisterComponent} from './asset-register.component';
import {MatTableModule} from '@angular/material/table';
import {NbCardModule} from '@nebular/theme';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {VehicleDetailComponent} from './vehicle-detail/vehicle-detail.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    AssetRegisterRoutesModules,
    MatTableModule,
    NbCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [AssetRegisterComponent, VehicleDetailComponent],
  providers: [AssetRegisterService, ]
})
export class AssetRegisterModule { }
