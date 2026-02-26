import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { DropdownOption } from '../../../stories/assets/value-configs/drop-down-view-model';

export interface DropDown {
  name: string;
  value: any;
}

@Component({
  selector: 'app-drop-down-component',
  templateUrl: './drop-down-component.html',
  styleUrl: './drop-down-component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropDownComponent,
      multi: true,
    },
  ],
})
export class DropDownComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input() label?: string = 'Gender';
  @Input() placeHolder?: string = ' ';
  @Input() isRequired?: boolean = false;
  @Input() options: DropdownOption[] | null = null;

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  @Input() dropDownModel: string = '';

  @Output() selectedChange = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<void>();

  draggable: boolean = false;

  uniqueId: string = '';

  // Stores actual value (for form submission)
  selectedValue: any = null;

  // Stores display name (for UI)
  selectedLabel: string = '';

  isOpenUp: boolean = false;
  isOpen: boolean = false;
  isActive: boolean = false;

  private disabled = false;

  private startY = 0;
  private startHeight = 0;
  private resizing = false;

  private mouseMoveListener?: (event: MouseEvent) => void;
  private mouseUpListener?: (event: MouseEvent) => void;

  constructor(private eRef: ElementRef, private renderer: Renderer2) {
    this.mouseMoveListener = this.handleMouseMove.bind(this);
    this.mouseUpListener = this.handleMouseUp.bind(this);
  }

  ngOnInit() {
    const randomStr = Math.random().toString(36).substring(2, 9);
    this.uniqueId = `dropdown_${this.id}_${randomStr}`;
  }

  // ======= FORM CONTROL =======
  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  get optionLength(): number {
    return this.options?.length ?? 0;
  }

  // ======= CONTROL VALUE ACCESSOR =======
  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(obj: any): void {
    this.selectedValue = obj;

    // Find matching label
    const found = this.options?.find((o) => o.value === obj);
    this.selectedLabel = found ? found.name : '';

    this.isActive = !!obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ======= TOGGLE DROPDOWN =======
  toggleDropdown() {
    if (this.disabled) return;

    this.isOpen = !this.isOpen;
    this.isActive = true;

    if (this.isOpen) {
      setTimeout(() => {
        this.decideDropdownDirection();
        this.setInitialHeight();
      }, 0);
    }
  }

  // ======= SELECT OPTION =======
selectOption(option: DropDown) {
  this.selectedValue = option.value;
  this.selectedLabel = option.name;

  this.isActive = true;

  this.onChange(this.selectedValue);

  this.control?.setValue(option.value);
  this.control?.markAsTouched();
  this.control?.markAsDirty();

  this.selectedChange.emit(this.selectedValue);

  this.closeDropdown();   // ✅ close ONLY here
}


  // ======= BLUR EVENT =======
onBlur() {
  this.control?.markAsTouched();
  this.onTouched();
  this.blurEvent.emit();

  // only handle floating label reset
  setTimeout(() => {
    if (!this.selectedValue) {
      this.isActive = false;
    }
  }, 100);
}


  // ======= CLOSE DROPDOWN =======
  private closeDropdown() {
    this.isOpen = false;
  }

  // ======= CLOSE WHEN CLICK OUTSIDE =======
@HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.closeDropdown();

    if (!this.selectedValue) {
      this.isActive = false;
    }
  }
}


  // ======= DROPDOWN DIRECTION DECISION =======
  private decideDropdownDirection() {
    const dropdown = this.eRef.nativeElement.querySelector(
      '.custom-dropdown'
    ) as HTMLElement;

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list'
    ) as HTMLElement;

    if (!dropdown || !list) return;

    list.style.visibility = 'hidden';
    list.style.display = 'block';

    const listHeight = list.offsetHeight || 150;

    list.style.display = '';
    list.style.visibility = '';

    const rect = dropdown.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    this.isOpenUp = spaceBelow < listHeight && spaceAbove > spaceBelow;
  }

  // ======= INITIAL HEIGHT SETUP =======
  private setInitialHeight() {
    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list'
    ) as HTMLElement;

    if (list) {
      const optionHeight = 38;
      const buffer = 36;

      const totalHeight = this.optionLength * optionHeight + buffer;
      const initialHeight = Math.min(244, totalHeight);

      this.renderer.setStyle(list, 'height', `${initialHeight}px`);
      this.renderer.setStyle(list, 'max-height', `${totalHeight}px`);
      this.renderer.setStyle(list, 'overflow-y', 'auto');
      this.renderer.setStyle(list, 'resize', 'none');
      this.renderer.setStyle(list, 'transform-origin', 'top');
    }
  }

  // ======= DRAG RESIZE SUPPORT =======
  ngAfterViewInit() {
    if (!this.draggable) return;

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list'
    ) as HTMLElement;

    const handle = this.eRef.nativeElement.querySelector(
      '.resize-hr'
    ) as HTMLElement;

    if (!list || !handle) return;

    handle.addEventListener('mousedown', (event: MouseEvent) => {
      this.startY = event.clientY;
      this.startHeight = list.offsetHeight;
      this.resizing = true;

      handle.classList.add('dragging');
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';

      event.preventDefault();
      event.stopPropagation();
    });

    document.addEventListener('mousemove', this.mouseMoveListener!, {
      passive: false,
    });

    document.addEventListener('mouseup', this.mouseUpListener!, {
      passive: false,
    });

    document.addEventListener('contextmenu', this.preventContextMenu, {
      passive: false,
    });
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.resizing) return;

    event.preventDefault();
    event.stopPropagation();

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list'
    ) as HTMLElement;

    if (!list) return;

    const diff = event.clientY - this.startY;
    let newHeight = this.startHeight + diff;

    const totalHeight = this.optionLength * 38;
    const minHeight = 80;

    newHeight = Math.min(newHeight, totalHeight);
    newHeight = Math.max(newHeight, minHeight);

    list.style.height = `${newHeight}px`;
    list.style.minHeight = `${newHeight}px`;
    list.style.maxHeight = `${Math.max(newHeight, totalHeight)}px`;

    if (newHeight >= totalHeight) {
      this.renderer.setStyle(list, 'overflow-y', 'hidden');
    } else {
      this.renderer.setStyle(list, 'overflow-y', 'auto');
    }

    this.adjustDropdownPosition(list);
  }

  private handleMouseUp(event: MouseEvent) {
    if (!this.resizing) return;

    event.preventDefault();
    event.stopPropagation();

    this.resizing = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list'
    ) as HTMLElement;

    if (list) {
      const currentHeight = list.offsetHeight;
      list.style.height = `${currentHeight}px`;
      list.style.transition = 'none';
      list.style.cursor = 'default';
    }

    document.removeEventListener('mousemove', this.mouseMoveListener!);
    document.removeEventListener('mouseup', this.mouseUpListener!);
    document.removeEventListener('contextmenu', this.preventContextMenu);
  }

  private adjustDropdownPosition(list: HTMLElement) {
    const dropdown = this.eRef.nativeElement.querySelector(
      '.custom-dropdown'
    ) as HTMLElement;

    if (!dropdown || !list) return;

    const rect = dropdown.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < listRect.height && spaceAbove > spaceBelow) {
      this.isOpenUp = true;
    } else {
      this.isOpenUp = false;
    }
  }

  private preventContextMenu = (event: Event) => {
    event.preventDefault();
  };

  // ======= DESTROY CLEANUP =======
  ngOnDestroy() {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
    }
    document.removeEventListener('contextmenu', this.preventContextMenu);
  }
}
