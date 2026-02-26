import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoFormComponent } from './controls/info-form-component/info-form-component';
import { ModuleComponent } from './controls/module-component/module-component';



const routes: Routes = [
  { path: '', redirectTo: 'module', pathMatch: 'full' },
  { path: 'module', component: ModuleComponent },
  { path: 'infoform', component: InfoFormComponent },
  { path: '**', redirectTo: 'module' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}