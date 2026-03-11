import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-various-services-component',
  templateUrl: './various-services-component.html',
  styleUrl: './various-services-component.scss',
})
export class VariousServicesComponent {
  @Output() serviceSelected = new EventEmitter<string>();

  selectService(serviceType: string) {
    this.serviceSelected.emit(serviceType);
  }
}