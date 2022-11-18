import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[hgmDayContainerItem]',
  exportAs: 'htmDayContainerItem',
})
export class DayContainerItemDirective {
  constructor(public viewRef: ViewContainerRef) {}
}
