import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { NEVER, defer } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
// import {SpinnerOverlay} from './spinner-overlay';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef = undefined;
  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());
  constructor(private overlay: Overlay /*SpinnerOverlay*/) {}

  public show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay // .createWithDefaultConfig();
        .create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        panelClass: 'columns',
        hasBackdrop: true,

      });
      this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));

    });
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
