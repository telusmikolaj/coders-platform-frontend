import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRegistrationRequest} from "../models/UserRegistrationRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegistrationRequest) {
    return this.http.post('http://localhost:8080/api/v1/users/register', user);
  }

}
