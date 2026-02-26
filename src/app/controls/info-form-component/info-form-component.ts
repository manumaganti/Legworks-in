import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextBoxComponent } from "../text-box-component/text-box-component";
import { TextAreaComponent } from "../text-area-component/text-area-component";
import { CalenderComponent } from "../calender-component/calender-component";
import { DropDownComponent } from "../drop-down-component/drop-down-component";
import { NumberBoxComponent } from "../number-box-component/number-box-component";

@Component({
  selector: 'app-info-form-component',
  standalone: true,
  imports: [
    TextBoxComponent,
    TextAreaComponent,
    CalenderComponent,
    DropDownComponent,
    NumberBoxComponent
  ],
  templateUrl: './info-form-component.html',
  styleUrls: ['./info-form-component.scss']
})
export class InfoFormComponent {


  showPopup: boolean = false;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  service: string = '';
  details: string = '';
  date: string = '';

  constructor(private router: Router) {}

valueChange(value: any) {
  console.log('===== VALUE CHANGE =====');
  console.log('Raw event:', value);
  console.log('Event type:', typeof value);
  if (typeof value === 'object') {
    console.log('Object keys:', Object.keys(value));
    console.log('Stringified:', JSON.stringify(value));
  }
  if (typeof value === 'string') {
    console.log('String value received:', value);
    if (!this.fullName) {
      this.fullName = value;
      console.log('Set fullName to:', this.fullName);
    } else if (!this.email) {
      this.email = value;
      console.log('Set email to:', this.email);
    } else if (!this.phone) {
      this.phone = value;
      console.log('Set phone to:', this.phone);
    }
    return;
  }
  if (typeof value === 'object' && value !== null) {
    if (value.text !== undefined) {
      console.log('Text property:', value.text);
      if (value.label === 'Full Name' || value.placeholder?.includes('Name')) {
        this.fullName = value.text;
      } else if (value.label === 'Email Address' || value.placeholder?.includes('Email')) {
        this.email = value.text;
      } else if (value.label === 'Phone Number' || value.placeholder?.includes('+91')) {
        this.phone = value.text;
      } else if (value.label === 'Address') {
        this.address = value.text;
      } else if (value.label === 'Additional Details/Description') {
        this.details = value.text;
      }
    }
    if (value.value !== undefined) {
      console.log('Value property:', value.value);
      if (value.label === 'Full Name') {
        this.fullName = value.value;
      } else if (value.label === 'Email Address') {
        this.email = value.value;
      } else if (value.label === 'Phone Number' || value.type === 'number') {
        this.phone = value.value;
      } else if (value.label === 'Address') {
        this.address = value.value;
      } else if (value.label === 'Additional Details/Description') {
        this.details = value.value;
      }
    }
    if (value.input !== undefined) {
      console.log('Input property:', value.input);
      if (!this.fullName) this.fullName = value.input;
      else if (!this.email) this.email = value.input;
      else if (!this.phone) this.phone = value.input;
    }
  }
  
  console.log('Current state:', {
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
    address: this.address,
    service: this.service,
    details: this.details
  });
  console.log('===== END =====');
}

selectedChange(value: any) {
  console.log('Dropdown selected:', value);
  if (value?.name) {
    this.service = value.name;
    console.log('Service set by name:', this.service);
  }
  else if (value?.value) {
    const options = [
      {value: 1, name: 'Home Needs & Special Services'},
      {value: 2, name: 'Events & Gatherings'},
      {value: 3, name: 'Financial/Investment Services'},
      {value: 4, name: 'Online Health Care Services'},
      {value: 5, name: 'Property Management Services'},
      {value: 6, name: 'Tours And Travels Services'},
      {value: 7, name: 'Taxation/Legal'},
      {value: 8, name: 'Documents Procurement'}
    ];
    
    const selectedOption = options.find(opt => opt.value === value.value);
    if (selectedOption) {
      this.service = selectedOption.name;
      console.log('Service set by value:', this.service);
    }
  }
  else if (typeof value === 'object' && value !== null) {
    const firstKey = Object.keys(value)[0];
    if (firstKey) {
      this.service = value[firstKey];
      console.log('Service set from object property:', this.service);
    }
  }
  else if (typeof value === 'string') {
    this.service = value;
    console.log('Service set as string:', this.service);
  }
  else if (typeof value === 'number') {
    const options = [
      {value: 1, name: 'Home Needs & Special Services'},
      {value: 2, name: 'Events & Gatherings'},
      {value: 3, name: 'Financial/Investment Services'},
      {value: 4, name: 'Online Health Care Services'},
      {value: 5, name: 'Property Management Services'},
      {value: 6, name: 'Tours And Travels Services'},
      {value: 7, name: 'Taxation/Legal'},
      {value: 8, name: 'Documents Procurement'}
    ];
    
    const selectedOption = options.find(opt => opt.value === value);
    if (selectedOption) {
      this.service = selectedOption.name;
      console.log('Service set by number value:', this.service);
    }
  }
  
  console.log('Current service value:', this.service);
}

  dateSelected(value: Date | null) {
    console.log('=== DATE SELECTED ===');
    console.log('Date event:', value);
    
    if (value) {
      if (typeof value === 'string') {
        this.date = value;
      } else if (value instanceof Date) {
        this.date = value.toDateString();
      }
      console.log('Set date to:', this.date);
    }
    console.log('=== END DATE ===');
  }

  blurEvent() {
    console.log('Blur event triggered');
  }

ThankYou() {

  const phoneNumbers: string[] = [
    "917569227605",  
    "918050507688"    
  ];

  const message =
`*New Service Request*

Name: ${this.fullName || 'Not provided'}
Email: ${this.email || 'Not provided'}
Phone: ${this.phone || 'Not provided'}
Address: ${this.address || 'Not provided'}
Service: ${this.service || 'Not provided'}
Preferred Date: ${this.date || 'Not provided'}

Details:
${this.details || 'No details provided'}`;

  const encodedMessage = encodeURIComponent(message);

  phoneNumbers.forEach((number: string) => {
    const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  });

  this.showPopup = true;
}

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/module']);
  }
 Hi() {
this.router.navigate(['/module']);
}
}