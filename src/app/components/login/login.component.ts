import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLoginRequest } from 'src/app/models/UserLoginRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
});

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  
  ngOnInit(): void {

  }

  isTouched(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control && control.touched;
  }
  
  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control && control.hasError(errorName);
  }

  onLogin() {
    console.log('onLogin');
    if (this.loginForm.valid) {
      console.log('valid');
      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');

      if (emailControl && passwordControl && emailControl.value && passwordControl.value) {
          const request: UserLoginRequest = {
              email: emailControl.value,
              password: passwordControl.value
          }
        


      this.authService.loginUser(request).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      console.log('invalid  ttr');

      this.loginForm.markAllAsTouched();
    }
  }
  }

}
