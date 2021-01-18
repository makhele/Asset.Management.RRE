import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {RoutePaths} from '../shared/utils/route-paths';
import {AssetRegisterComponent} from './asset-register.component';

const routes: Routes = [
  { path: RoutePaths.ASSET_REGISTER, component: AssetRegisterComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AssetRegisterRoutesModules{};
