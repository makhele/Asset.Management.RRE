import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginRoutesModules} from './login.routing';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutesModules,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
