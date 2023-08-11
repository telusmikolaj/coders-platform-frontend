import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { UserRegistrationRequest } from '../models/UserRegistrationRequest';
import { Observable, from, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

export interface AuthConfig {
  redirectUrlLogin: string;
  redirectUrlLogout: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keycloak = inject(KeycloakService);

  constructor(private http: HttpClient) {
    this.keycloak.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.keycloak.getKeycloakInstance().loadUserProfile();
      }
    });
  }

  registerUser(user: UserRegistrationRequest) {
    // return this.http.post('http://localhost:8082/api/auth/register', user)
    // .pipe(
    //   catchError(this.handleError.bind(this))
    // );
  }

  login() {
    this.keycloak
      .login({ redirectUri: 'http://localhost:4200/user-dashboard' })
      .then();
  }

  public logout(): void {
    this.keycloak.logout('http://localhost:4200/home').then();
  }

  public testSecure(): void {
    this.http.get('http://localhost:8082/api/auth/test').subscribe(response => {
    console.log(response);
  }, error => {
    console.error(error);
  });
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
    return this.keycloak.getKeycloakInstance()?.profile?.username as string;
  }

  getId(): string {
    return this.keycloak?.getKeycloakInstance()?.profile?.id as string;
  }

  getTokenExpirationDate(): number {
    return (
      this.keycloak.getKeycloakInstance().refreshTokenParsed as { exp: number }
    )['exp'] as number;
  }

  refresh(): Observable<any> {
    return from(this.keycloak.getKeycloakInstance().updateToken(1800));
  }

  isExpired(): boolean {
    return this.keycloak.getKeycloakInstance().isTokenExpired();
  }

  private handleError(error: HttpErrorResponse) {
    console.log(this); // Dodaj to

    let userFacingMessage = '';

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      userFacingMessage = error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
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
      'error.unexpected_error': 'Nie udało się utworzyć użytkownika.',
    };

    return errorMessages[errorCode] || 'Wystąpił nieoczekiwany błąd.';
  }
}
