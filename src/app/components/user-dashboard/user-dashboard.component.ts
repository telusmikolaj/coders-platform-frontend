import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(private authService: AuthService) { } // Wstrzykuj AuthService

  logout() {
    console.log('UserDashboardComponent: logout()'); 
    this.authService.logout();
  }

}
