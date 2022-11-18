import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[hgmDayContainerItem]',
  exportAs: 'htmDayContainerItem',
})
export class DayContainerItemDirective {
  constructor(public elementRef: ElementRef) {}
}
