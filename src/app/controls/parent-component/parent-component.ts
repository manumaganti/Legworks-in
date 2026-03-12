import { Component } from '@angular/core';
import { VariousServicesComponent } from "../various-services-component/various-services-component";
import { TypesComponent } from "../types-component/types-component";

interface ServiceData {
  title: string;
  icon: string;
  overview: string;
  assistItems: string[];
  whyChooseUs: string;
  buttonText?: string; 
}

interface ServicesMap {
  [key: string]: ServiceData; 
}

@Component({
  selector: 'app-parent-component',
  imports: [VariousServicesComponent, TypesComponent],
  templateUrl: './parent-component.html',
  styleUrl: './parent-component.scss',
})
export class ParentComponent {

  showServiceDetail = false;
  selectedService: ServiceData | null = null;

  serviceData: ServicesMap = {
    homeNeeds: {
      title: 'Home Needs & Special Services',
      icon: '🛒',
      overview: 'We are here to support you and your family with all your essential home needs, ensuring comfort, convenience, and peace of mind.',
      assistItems: [
        'Grocery shopping and doorstep delivery',
        'Live clothing purchases and personal shopping assistance',
        'Home furnishings and décor selection',
        'Appliances sourcing and coordination',
        'Packaging and delivery anywhere in India',
        'International shipping arrangements'
      ],
      whyChooseUs: 'Whether you are living abroad or managing things from a distance, we act as your trusted support system on the ground.'
    },

    eventPlanning: {
      title: 'Event Planning & Management',
      icon: '🎁',
      overview: 'We help make your events special and stress-free by providing complete support for your gatherings and celebrations.',
      assistItems: [
        'Gift Selection Assistance',
        'Event Decorations Support',
        'Guest Care & Coordination',
        'Global Purchase & Delivery Support',
      ],
      whyChooseUs: 'We blend tradition with elegance to ensure unforgettable celebrations.'
    },

    financialServices: {
      title: 'Financial and Investment Management Services',
      icon: '💰',
      overview: 'In India, we are backed by highly experienced professionals with over a decade of industry expertise. Our experts provide personalized guidance and strategic support to help you make informed financial decisions.',
      assistItems: [
        'Financial Planning',
        'Investment Strategies',
        'Tax Planning & Compliance',
        'Wealth Management Insights',
        'Risk Assessment & Portfolio Review',
      ],
      whyChooseUs: 'Our goal is to ensure your financial journey is secure, structured, and aligned with your long-term goals. With trusted advice and thoughtful planning, we help you build a stronger financial future.'
    },

    healthCare: {
      title: 'Health Care Support',
      icon: '🏥',
      overview: 'Don’t worry — we are here to support you and care for them like our own. We understand how challenging it can be to stay away from your loved ones. That’s why we provide dependable assistance to ensure your elderly parents receive the attention and care they deserve.',
      assistItems: [
        'Arranging regular health check-ups',
        'Coordinating medical investigations and diagnostic tests',
        'Assisting with doctor appointments',
        'Monitoring monthly or periodic health reviews',
        'Providing updates and reports to family members'
      ],
      whyChooseUs: 'With compassion, responsibility, and professionalism, we help ensure your parents’ basic health needs are met — giving you peace of mind, no matter where you are in the world.'
    },

    propertyManagement: {
      title: 'Property Management Services',
      icon: '🏠',
      overview: 'If you are living abroad and concerned about managing your properties or assets in India, you’re not alone — and you don’t have to handle it alone. We provide reliable support to help you safeguard and manage your assets efficiently, even from a distance.',
      assistItems: [
        'Property monitoring and coordination',
        'Assistance with documentation and paperwork',
        'Support for registrations and legal formalities',
        'Liaising with concerned authorities and professionals',
        'Connecting you with trusted local experts',
        'Ensuring smooth, hassle-free completion of tasks'
      ],
      whyChooseUs: 'With our strong network and on-ground presence, we help you complete your work efficiently and transparently.'
    },

    toursTravels: {
      title: 'Tours and Travels Support',
      icon: '✈️',
      overview: 'If you are planning a tour to India, we are here to design a smooth, memorable, and completely tension-free holiday tailored to your preferences. We carefully plan your journey based on your interests — whether you love heritage, spirituality, nature, luxury, adventure, food, or family experiences.',
      assistItems: [
        'Customized holiday planning',
        'Personalized itinerary creation',
        'Guidance on the best destinations based on your interests',
        'Hotel and local travel coordination',
        'On-ground assistance and support',
        'Guidance on arranging travel tickets for your loved ones from India at the best possible prices'
      ],
      whyChooseUs: 'With our local expertise and trusted network, we ensure your trip is comfortable, well-organized, and truly unforgettable.'
    }
  };

onServiceToggled(serviceType: string) {

  const service = this.serviceData[serviceType];

  if (this.selectedService?.title === service.title && this.showServiceDetail) {
    this.onCloseService();
  } else {

    this.selectedService = service;
    this.showServiceDetail = true;
    setTimeout(() => {
      const element = document.getElementById('service-detail');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);

  }
}
  onCloseService() {

    this.showServiceDetail = false;
    this.selectedService = null;

    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);

  }
}