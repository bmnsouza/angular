import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { PlatformDetectorService } from '../../../core/plataform-detector/plataform-detector.service';

@Directive({
  selector: '[immediateClick]'
})
export class immediateClickDirective implements AfterViewInit {

  constructor(
    private element: ElementRef<any>,
    private platFormDetector: PlatformDetectorService) { }

  ngAfterViewInit(): void {
    this.platFormDetector.isPlatformBrowser &&
      this.element.nativeElement.click();
  }
}