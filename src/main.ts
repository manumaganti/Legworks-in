import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/controls/app.component/app.component';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(CommonModule, HttpClientModule, AppRoutingModule)]
})
  .catch(err => console.error(err));