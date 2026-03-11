import { Component } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';
import { Router } from '@angular/router';
import { InfoFormComponent } from "../info-form-component/info-form-component";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [InfoFormComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

  isServicesOpen = false;
  isContactOpen = false;

  showServiceModal = false;
  selectedService = '';

  constructor(private dropdownService: DropdownService, private router: Router) {}

  ngOnInit() {
    this.dropdownService.openServices$.subscribe(() => {
      console.log("Signal received in header");
      this.isServicesOpen = true;
    });
  }

// openServiceForm(service: string) {
//   this.selectedService = service;
//   this.showServiceModal = true;
//   this.isServicesOpen = false;

//   document.body.style.overflow = 'hidden';
// }

closeServiceForm() {
  this.showServiceModal = false;
  document.body.style.overflow = 'auto';
}

  toggleServices() {
    this.isServicesOpen = !this.isServicesOpen;
    if (this.isServicesOpen) {
      this.isContactOpen = false;
    }
  }

  showContact() {
    if (!this.isServicesOpen) {
      this.isContactOpen = true;
    }
  }

  hideContact() {
    this.isContactOpen = false;
  }

  hideServices() {
    this.isServicesOpen = false;
  }
  scrollToAbout() {
  const element = document.getElementById('about');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

}
  scrollToHome() {
  const element = document.getElementById('home');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
  openServiceForm() {
  const element = document.getElementById('services');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
}