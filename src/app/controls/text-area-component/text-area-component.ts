import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area-component',
  templateUrl: './text-area-component.html',
  styleUrl: './text-area-component.scss',
})
export class TextAreaComponent {

  @Input() label?: string = 'Additional Details';
  @Input() placeHolder?: string = 'Tell us more about your requirements';
  @Input() value: string = ''; // Add this to accept initial value
  @Output() valueChange = new EventEmitter<any>(); // Add this to emit changes
  @Output() blur = new EventEmitter<void>(); // Add this for blur events
  
  maxLength: number = 200;
  currentValue: string = '';
  remainingChars: number = this.maxLength;

  isInvalid: boolean = false;

  ngOnInit() {
    // Initialize with input value if provided
    this.currentValue = this.value || '';
    this.remainingChars = this.maxLength - this.currentValue.length;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.currentValue = value;
    this.remainingChars = this.maxLength - value.length;
    
    // Emit the change event
    this.valueChange.emit({
      label: this.label,
      value: this.currentValue
    });

    this.checkValidation();
  }

  onBlur() {
    this.checkValidation();
    this.blur.emit(); // Emit blur event
  }

  checkValidation() {
    this.isInvalid = this.currentValue.trim().length === 0;
  }
}