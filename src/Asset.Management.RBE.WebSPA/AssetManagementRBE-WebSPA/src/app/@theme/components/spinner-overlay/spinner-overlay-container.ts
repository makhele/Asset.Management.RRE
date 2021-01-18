// import {OverlayContainer} from '@angular/cdk/overlay';
// @Injectable()
// export class SpinnerOverlayContainer extends OverlayContainer{
//
//     // _createContainer(): void {
//     //   //   //let container = document.createElement('div');
//     //   //   // container.classList.add('app-overlay-container');
//     //   //
//     //   // //let container = document.querySelector('.content');//.appendChild(container);
//     //   //   this._containerElement = document.querySelector('.content');
//     //
//     //     let container = document.createElement('div');
//     //     container.classList.add('ssr');
//     //
//     //     document.querySelector('#useshttp').appendChild(container);
//     //     this._containerElement = container;
//     //   }
//
//   /**
//    * Create overlay container and append to ElementRef from directive
//    */
//   public myCreateContainer(element: HTMLElement): void {
//     let container = document.createElement('div');
//     container.classList.add('my-custom-overlay-container-class');
//
//     element.appendChild(container);
//     this._containerElement = container;
//   }
//   /**
//    * Prevent creation of the HTML element, use custom method above
//    */
//   protected _createContainer(): void {
//     return;
//   }
// }
//
// import {Directive, ElementRef, Injectable} from '@angular/core';
//
// @Directive({
//   selector: '[myCdkOverlayContainer]'
// })
// export class CdkOverlayContainerDirective {
//   constructor(
//     protected elementReference: ElementRef,
//     protected cdkOverlayContainer: SpinnerOverlayContainer
//   ) {
//     this.elementReference    = elementReference;
//     this.cdkOverlayContainer = cdkOverlayContainer;
//
//     this.cdkOverlayContainer['myCreateContainer'](this.elementReference.nativeElement);
//   }
// }
