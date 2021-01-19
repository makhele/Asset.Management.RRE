import { Routes, RouterModule } from '@angular/router';
import {RoutePaths} from '../shared/utils/route-paths';
import {LoginComponent} from './login.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: RoutePaths.LOGIN, component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutesModules{}

