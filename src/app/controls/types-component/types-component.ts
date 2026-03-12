import { Component, Input, EventEmitter, Output } from '@angular/core';
import { InfoFormComponent } from "../info-form-component/info-form-component";

@Component({
  selector: 'app-types-component',
  standalone: true,
  imports: [InfoFormComponent], // Make sure to import InfoFormComponent here if it's standalone
  templateUrl: './types-component.html',
  styleUrl: './types-component.scss',
})
export class TypesComponent {
  @Input() serviceTitle: string = 'Home Needs & Special Services';
  @Input() serviceIcon: string = '🛒';
  @Input() overviewText: string = 'We are here to support you and your family with all your essential home needs, ensuring comfort, convenience, and peace of mind. From everyday necessities to special purchases, we take care of everything with attention and reliability.';
  @Input() assistItems: string[] = [
    'Grocery shopping and doorstep delivery',
    'Live clothing purchases and personal shopping assistance',
    'Home furnishings and décor selection',
    'Appliances sourcing and coordination',
    'Packaging and delivery anywhere in India',
    'International shipping arrangements'
  ];
  @Input() whyChooseUsText: string = 'Whether you are living abroad or managing things from a distance, we act as your trusted support system on the ground — handling every detail with care, transparency, and efficiency.';
  @Input() buttonText: string = 'Request this service';
  @Output() closeClicked = new EventEmitter<void>();
  
  // Modal properties
  showInfoModal = false;

  closeService() {
    this.closeClicked.emit();
  }

  // Method to open info form modal
  openInfoForm() {
    this.showInfoModal = true;
    document.body.style.overflow = 'hidden';
  }

  // Method to close info form modal
// In your VariousServicesComponent
// closeAndScroll() {
//   this.closeInfoForm();
//   // Use setTimeout to ensure the modal closes before scrolling
//   setTimeout(() => {
//     this.closing();
//   }, 100);
// }

closeInfoForm() {
  this.showInfoModal = false;
  document.body.style.overflow = 'auto';
}

}