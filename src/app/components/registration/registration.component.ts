import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserRegistrationRequest} from "../../models/UserRegistrationRequest";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
}, { validators: this.checkPasswords });

  checkPasswords(group: FormGroup) { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value;
  
    return pass === confirmPass ? null : { notSame: true }     
  }

  hasMinLengthError() {
    const control = this.registrationForm.get('password');
    return control?.hasError('minlength') ?? false;
  }

  hasError(controlName: string, errorName: string) {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }
  
  isTouched(controlName: string) {
    return this.registrationForm.controls[controlName].touched;
  }
  
  

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  
  ngOnInit(): void {

  }

  onRegister() {
    console.log('onRegister');
    if (this.registrationForm.valid) {
      console.log('valid');
      const request: UserRegistrationRequest = {
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value

      }

      this.authService.registerUser(request).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      console.log('invalid  ttr');

      this.registrationForm.markAllAsTouched();
    }
  }



}
