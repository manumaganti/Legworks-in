import { Component } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-body-component',
  imports: [],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
constructor(private dropdownService: DropdownService) {}

  openServiceForm() {
  const element = document.getElementById('services');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  
}
scrollToWhat() {
  const element = document.getElementById('what');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
}
