import { Component } from '@angular/core';
import { HeaderComponent } from "../header-component/header-component";
import { BodyComponent } from "../body-component/body-component";
import { VariousServicesComponent } from "../various-services-component/various-services-component";
import { AboutUsComponent } from "../about-us-component/about-us-component";
import { ParentComponent } from "../parent-component/parent-component";

@Component({
  selector: 'app-module-component',
  imports: [HeaderComponent, BodyComponent, AboutUsComponent, ParentComponent],
  templateUrl: './module-component.html',
  styleUrl: './module-component.scss',
})
export class ModuleComponent {

}
