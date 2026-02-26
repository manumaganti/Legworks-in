import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-box-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './number-box-component.html',
  styleUrl: './number-box-component.scss',
})
export class NumberBoxComponent implements OnInit, OnChanges {
  @Input() label: string = 'Phone Number';
  @Input() placeHolder: string = 'Enter phone number';
  @Input() isRequired: boolean = true;

  @Input() id: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() tabindex?: number;

  @Input() showBorder: boolean = true;

  @Input() value: string = '';

  // Change this to 'any' to emit an object
  @Output() valueChange = new EventEmitter<any>();

  currentValue: string = '';
  isFocused: boolean = false;
  showError: boolean = false;

  ngOnInit(): void {
    this.currentValue = this.value ?? '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.currentValue = this.value ?? '';
    }
  }

  getInputStyle() {
    const baseStyle: any = {
      'background-color': 'white'
    };

    if (!this.showBorder) {
      return { ...baseStyle, border: 'none' };
    }

    return baseStyle;
  }

  onNumberInput(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value;

    inputValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue.length > 10) {
      inputValue = inputValue.substring(0, 10);
    }

    this.currentValue = inputValue;
    this.value = inputValue;
    this.valueChange.emit({
      label: this.label,
      value: inputValue,
      type: 'number'
    });
    this.showError = !(this.currentValue.length === 0 || /^[6-9]\d{9}$/.test(this.currentValue));
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur(event: FocusEvent) {
    this.isFocused = false;
    if (this.isRequired) {
      this.showError = !/^[6-9]\d{9}$/.test(this.currentValue);
    }
  }

}