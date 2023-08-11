import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {

  constructor(private authService: AuthService) {}

  login(event: Event) {
    event.preventDefault();
    this.authService.login();
  }

}
