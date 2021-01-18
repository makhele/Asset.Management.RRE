import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCarouselDuplicate]'
})
export class CarouselDuplicateDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit()
  {
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.viewContainer.createEmbeddedView(this.templateRef)

  }

}
