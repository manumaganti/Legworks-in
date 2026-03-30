import { Component } from '@angular/core';

@Component({
  selector: 'app-what-we-do-component',
  imports: [],
  templateUrl: './what-we-do-component.html',
  styleUrl: './what-we-do-component.scss',
})
export class WhatWeDoComponent {

  images: string[] = [
    'photo.jpg',
    'photo-17.jpg',
    'photo-3.jpg',
    'photo-18.jpg',
    'photo-19.jpeg',
    'photo-6.jpg',
    'photo-7.jpg',
    'photo-8.jpg',
    'photo-9.jpg',
    'photo-10.jpg',
    'photo-11.jpg',
    'photo-12.jpg',
    'photo-13.jpg',
    'photo-14.jpg',
    'photo-15.jpg',
    'photo-16.jpg',
  ];

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
}
