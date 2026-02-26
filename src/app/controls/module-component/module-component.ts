import { Component } from '@angular/core';
import { HeaderComponent } from "../header-component/header-component";
import { BodyComponent } from "../body-component/body-component";

@Component({
  selector: 'app-module-component',
  imports: [HeaderComponent, BodyComponent],
  templateUrl: './module-component.html',
  styleUrl: './module-component.scss',
})
export class ModuleComponent {

}
