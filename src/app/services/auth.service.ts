import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRegistrationRequest} from "../models/UserRegistrationRequest";
import { UserLoginRequest } from '../models/UserLoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegistrationRequest) {
    return this.http.post('http://localhost:8082/api/auth/register', user);
  }

  loginUser(user: UserLoginRequest) {
    return this.http.post('http://localhost:8082/api/auth/login', user);
  }

}
