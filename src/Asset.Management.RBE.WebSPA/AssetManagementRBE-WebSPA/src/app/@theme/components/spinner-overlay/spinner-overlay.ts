// import {
//   Overlay,
//   OverlayKeyboardDispatcher,
//   OverlayPositionBuilder,
//   ScrollStrategyOptions,
//   OverlayRef
// } from '@angular/cdk/overlay';
// import {
//   ComponentFactoryResolver,
//   Inject,
//   Injector,
//   NgZone,
//   Renderer2,
//   RendererFactory2,
//   Injectable
// } from '@angular/core';
// import {Directionality} from '@angular/cdk/bidi';
// import {DOCUMENT} from '@angular/common';
// import {SpinnerOverlayContainer} from './spinner-overlay-container';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SpinnerOverlay extends Overlay {
//   private readonly _spinnerOverlayContainer: SpinnerOverlayContainer;
//   private renderer: Renderer2;
//
//   constructor(
//     scrollStrategies: ScrollStrategyOptions,
//     _overlayContainer: SpinnerOverlayContainer,
//     _componentFactoryResolver: ComponentFactoryResolver,
//     _positionBuilder: OverlayPositionBuilder,
//     _keyboardDispatcher: OverlayKeyboardDispatcher,
//     _injector: Injector,
//     _ngZone: NgZone,
//     @Inject(DOCUMENT) _document: any,
//     _directionality: Directionality,
//     rendererFactory: RendererFactory2
//   ) {
//     super(
//       scrollStrategies,
//       _overlayContainer,
//       _componentFactoryResolver,
//       _positionBuilder,
//       _keyboardDispatcher,
//       _injector,
//       _ngZone,
//       _document,
//       _directionality
//     );
//     this.renderer = rendererFactory.createRenderer(null, null);
//
//     this._spinnerOverlayContainer = _overlayContainer;
//   }
//
//   private setContainerElement(containerElement: HTMLElement): void {
//     this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
//     //this._spinnerOverlayContainer.setContainerElement(containerElement);
//   }
//
//   public createWithDefaultConfig(): OverlayRef {
//     //this.setContainerElement(containerElement);
//     return super.create({
//       positionStrategy: this.position()
//         .global()
//         .centerHorizontally()
//         .centerVertically(),
//       hasBackdrop: true
//     });
//   }
// }
