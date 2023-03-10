import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input('placeHolder') placeHolder: string = '';
  @Input('classes') classes: string[] = [
    // 'sm:w-10',
    'min-[320px]:w-28',
    'md:w-auto',
    'drop-shadow-lg',
    'bg-gray-50',
    'border',
    'border-gray-300',
    'text-gray-900',
    'text-sm',
    'rounded-lg',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'block',
    'w-80',
    'text-center',
    'p-2.5',
    'bg-gray-700',
    'border-gray-600',
    'placeholder-gray-400',
    'text-white',
    'focus:ring-blue-500',
    'focus:border-blue-500',
  ];
  @Input('name') name: string = '';
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  public _inputValue: string = '';
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() set inputValue(val: string) {
    this._inputValue = val;
    this.inputValueChange.emit(val);
  }
  public setValue(event: any) {
    this.inputValueChange.emit(event.target.value);
  }

  public clear() {
    if (this.inputElement) this.inputElement.nativeElement.value = '';
    this._inputValue = '';
  }
}
