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

goToForm() {
  console.log("Button clicked");
  this.dropdownService.openServices();
}
}
