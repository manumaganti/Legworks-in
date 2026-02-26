import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-calender-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calender-component.html',
  styleUrl: './calender-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalenderComponent),
      multi: true
    }
  ]
})
export class CalenderComponent implements ControlValueAccessor {

  @Input() label: string = "Date of Packaging";
  @Input() isRequired: boolean = true;

  @Output() dateSelected = new EventEmitter<Date | null>();

  showCalendar = false;
  isLabelFloating = false;

  weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  calendarDays: any[] = [];
  years: number[] = [];

  showMonthDropdown = false;
  showYearDropdown = false;

  selectedDate: Date | null = null;

  touched = false;
  disabled = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  get formattedDate(): string {
    return this.selectedDate
      ? this.selectedDate.toLocaleDateString('en-GB').replace(/\//g, '-')
      : '';
  }

  ngOnInit() {
    this.generateYears();
    this.generateCalendar();
  }

  writeValue(value: any): void {
    if (value instanceof Date) {
      this.selectedDate = value;
    } else if (typeof value === 'string' && value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        this.selectedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      }
    } else {
      this.selectedDate = null;
    }

    if (this.selectedDate) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
      this.isLabelFloating = true;
    }

    this.generateCalendar();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  openDatePicker(event: Event) {
    event.stopPropagation();

    if (this.disabled) return;

    this.showCalendar = !this.showCalendar;
    this.isLabelFloating = true;

    this.markAsTouched();
  }

  closeCalendar() {
    this.showCalendar = false;
    this.showMonthDropdown = false;
    this.showYearDropdown = false;

    if (!this.selectedDate) {
      this.isLabelFloating = false;
    }
  }

  selectDate(day: any) {
    this.selectedDate = new Date(day.date);
    this.currentMonth = this.selectedDate.getMonth();
    this.currentYear = this.selectedDate.getFullYear();

    this.generateCalendar();
    this.isLabelFloating = true;

    this.onChange(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);

    this.closeCalendar();
  }

  clearSelection() {
    this.selectedDate = null;
    this.onChange(null);
    this.dateSelected.emit(null);
    this.generateCalendar();

    this.isLabelFloating = false;
    this.closeCalendar();
  }

  generateYears() {
    this.years = [];
    for (let i = 1950; i <= 2050; i++) {
      this.years.push(i);
    }
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];
    const totalDays = 42;

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === this.currentMonth;
      const isSelected = this.isSelected(date);
      const isToday = this.isToday(date) && !isSelected;

      this.calendarDays.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    return this.selectedDate
      ? date.toDateString() === this.selectedDate.toDateString()
      : false;
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  toggleMonthDropdown() {
    this.showMonthDropdown = !this.showMonthDropdown;
    this.showYearDropdown = false;
  }

  toggleYearDropdown() {
    this.showYearDropdown = !this.showYearDropdown;
    this.showMonthDropdown = false;
  }

  selectMonth(index: number) {
    this.currentMonth = index;
    this.showMonthDropdown = false;
    this.generateCalendar();
  }

  selectYear(year: number) {
    this.currentYear = year;
    this.showYearDropdown = false;
    this.generateCalendar();
  }

  goToToday() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.selectedDate = today;

    this.onChange(today);
    this.generateCalendar();
    this.closeCalendar();
  }

  @HostListener('document:click')
  handleOutsideClick() {
    this.closeCalendar();
  }

}

