import { Routes, RouterModule } from '@angular/router';
import {RoutePaths} from '../shared/utils/route-paths';
import {VehicleVerifyComponent} from './vehicle-verify/vehicle-verify.component';
import {NgModule} from '@angular/core';
import {VerifiedVehiclesComponent} from './verified-vehicles/verified-vehicles.component';

const routes: Routes = [
  { path: RoutePaths.ASSET_VERIFICATION_VERIFY, component: VehicleVerifyComponent},
  { path: RoutePaths.ASSET_VERIFICATION_VERIFIED, component: VerifiedVehiclesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



export class VehicleVerificationRoutesModules {};
