import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[domChange]',
})
export class DomChangeDirective implements OnDestroy {
  @Output()
  public domChange = new EventEmitter();

  constructor() {}

  ngOnDestroy(): void {}
}
