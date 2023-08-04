import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserRegistrationRequest} from "../models/UserRegistrationRequest";
import { UserLoginRequest } from '../models/UserLoginRequest';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegistrationRequest) {
    return this.http.post('http://localhost:8082/api/auth/register', user)
    .pipe(
      catchError(this.handleError.bind(this))  
    );
  }

  loginUser(user: UserLoginRequest) {
    return this.http.post('http://localhost:8082/api/auth/login', user)
      .pipe(
        catchError(this.handleError.bind(this))  
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(this);  // Dodaj to
  
    let userFacingMessage = '';
  
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      userFacingMessage = error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      userFacingMessage = this.getErrorMessage(error.error);
    }
  
    return throwError(userFacingMessage);
  }

private getErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    'error.email.not_verified': 'Adres e-mail nie został zweryfikowany.',
    'error.invalid_credentials': 'Nieprawidłowe dane logowania.',
    'error.internal_server_error': 'Wystąpił błąd wewnętrzny serwera.',
    'error.bad_request': 'Błędne żądanie.',
    'error.unauthorized': 'Nieautoryzowane żądanie.',
    'error.forbidden': 'Dostęp zabroniony.',
    'error.conflict': 'Email jest już w użyciu.',
    'error.unexpected_error': 'Nie udało się utworzyć użytkownika.'
  };

  return errorMessages[errorCode] || 'Wystąpił nieoczekiwany błąd.';
}

}





