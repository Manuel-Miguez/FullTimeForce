import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]',
  standalone: true,
})
export class AlphanumericDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (/[-A-Z0-9_.]+/gi.test(event.key)) return true;
    else event.preventDefault();
    return false;
  }
}
