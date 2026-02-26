import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { ModuleComponent } from './controls/module-component/module-component';
import { InfoFormComponent } from './controls/info-form-component/info-form-component';
import { AppComponent } from './controls/app.component/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: ModuleComponent },
      { path: 'infoform', component: InfoFormComponent }
    ])
  ]
});