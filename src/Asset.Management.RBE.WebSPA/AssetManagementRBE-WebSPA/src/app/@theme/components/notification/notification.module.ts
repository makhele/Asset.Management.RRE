import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {NotificationService} from './notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule { }
