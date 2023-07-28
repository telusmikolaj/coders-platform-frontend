import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from "./components/registration/registration.component";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
