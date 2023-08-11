import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-unauthenticated',
  templateUrl: './navbar-unauthenticated.component.html',
  styleUrls: ['./navbar-unauthenticated.component.css']
})
export class NavbarUnauthenticatedComponent {

  constructor(private authService: AuthService) { }

  testSecure() {
      this.authService.testSecure();
  }

}
