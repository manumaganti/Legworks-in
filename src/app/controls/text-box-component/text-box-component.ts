import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-box-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './text-box-component.html',
  styleUrl: './text-box-component.scss',
})
export class TextBoxComponent implements OnInit, OnChanges {

  @Input() label?: string = 'Text Box';
  @Input() placeHolder?: string = 'Enter here...';
  @Input() isRequired?: boolean = true;

  @Input() showBorder: boolean = true;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 50;
  @Input() showCharCount: boolean = true;

  @Input() id: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() isAllowSpecialChars: boolean = true;
  @Input() tabindex?: number;

  @Input() value: string = '';

  // Change the Output type to any to send an object
  @Output() valueChange = new EventEmitter<any>();

  shouldShowCount: boolean = false;
  currentValue: string = '';
  currentCharCount: number = 0;

  isFocused: boolean = false;

  ngOnInit(): void {
    this.currentValue = this.value ?? '';
    this.updateCharCount();
    this.updateShowCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.currentValue = this.value ?? '';
      this.updateCharCount();
      this.updateShowCount();
    }

    if (changes['maxLength']) {
      this.updateCharCount();
    }
  }

  private updateShowCount(): void {
    const hasValue = this.currentValue.trim().length > 0;
    this.shouldShowCount = hasValue || this.isFocused;
  }

  updateCharCount(): void {
    const currentLength = this.currentValue?.length ?? 0;
    this.currentCharCount = this.maxLength - currentLength;
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

  onValueChange(value: string) {
    this.currentValue = value;
    this.value = value;

    // Emit an object with label and value instead of just the string
    this.valueChange.emit({
      label: this.label,
      value: value,
      type: 'text'
    });

    this.updateCharCount();
    this.updateShowCount();
  }

  onFocus() {
    this.isFocused = true;
    this.updateShowCount();
  }

  onBlur(event: FocusEvent) {
    this.isFocused = false;
    this.updateShowCount();
  }
}