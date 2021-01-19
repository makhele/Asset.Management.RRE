import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RoutePaths} from '../shared/utils/route-paths';
import {PasswordResetComponent} from './password-reset/password-reset.component';

const routes: Routes = [
  { path: RoutePaths.LOGIN, component: LoginComponent},
  { path: RoutePaths.PASSWORD_RESET, component: PasswordResetComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutesModules{}

