import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() itemWidth;
  @Input() itemHeigth;
  @Input() itemsQuantity;

  @Input() showControls = true;
  @Input() showSelectors = true;
  @Input() timing = '500ms ease-in';

  currentSlide = this.itemsQuantity;
  increment = 2;
  offset = 0;

  private player: AnimationPlayer;
  @ViewChild('carousel') private carousel: ElementRef;
  @ViewChild('content') private content: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.resizeCarousel();
  }

  constructor(private builder: AnimationBuilder, private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.resizeCarousel();
    });
  }

  prev(): void {
    this.transitionCarousel(null, this.currentSlide - this.increment);
  }
  next(): void {

    this.transitionCarousel(null, this.currentSlide + this.increment);
  }
  setSlide(slide: number): void {
    slide = slide + this.itemsQuantity;
    this.transitionCarousel(null, slide);

  }
  private resizeCarousel(): void {
    if (this.carousel) {
      const totalWidth = this.carousel.nativeElement.getBoundingClientRect().width;
      this.increment = Math.floor(totalWidth / this.itemWidth);
      this.offset = (totalWidth - this.increment * this.itemWidth) / 2;
      this.transitionCarousel(null, this.itemsQuantity);
    }

  }
  private transitionCarousel(time: any, slide: number): void {
    if (slide >= 2 * this.itemsQuantity)
    {
      this.transitionCarousel(0, this.currentSlide - this.itemsQuantity);
      slide -= this.itemsQuantity;
    }
    const offset = this.offset - this.itemWidth * slide;
    const myAnimation: AnimationFactory = this.buildAnimation(offset, time);
    this.player = myAnimation.create(this.carousel.nativeElement);
    if (time !== 0) {
      if (slide < this.itemsQuantity)
      {
        this.player.onDone(() => {
          this.currentSlide = slide + this.itemsQuantity;
          this.transitionCarousel(0, this.currentSlide);
        });
      }
      else {
        this.currentSlide = slide;
      }
    }
    this.player.play();
  }
  private buildAnimation(offset, time: any): AnimationFactory {
    return this.builder.build([
      animate(time == null ? this.timing : 0, style({ transform: `translateX(${offset}px)` }))
    ]);
  }


}

