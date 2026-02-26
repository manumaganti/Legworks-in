import { Component } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

  isServicesOpen = false;

  constructor(private dropdownService: DropdownService,private router: Router) {}

  ngOnInit() {
    this.dropdownService.openServices$.subscribe(() => {
      console.log("Signal received in header");
      this.isServicesOpen = true;
    });
  }
 hello() {
this.router.navigate(['/infoform']);
}
  toggleServices() {
    this.isServicesOpen = !this.isServicesOpen;
  }
}
