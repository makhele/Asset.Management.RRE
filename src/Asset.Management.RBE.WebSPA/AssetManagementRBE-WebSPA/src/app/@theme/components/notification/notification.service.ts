import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  public open(message, action = 'success', duration = 50000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }

}
