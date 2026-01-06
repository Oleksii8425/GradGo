import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRole } from '../types';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    age: number,
    role: UserRole,
    email: string,
    password: string,
    city: string,
    countryId: number,
  ): Observable<{ status: string; data: { token: string; user: User } | null }> {
    const body = {
      firstName,
      lastName,
      age,
      role,
      email,
      password,
      city,
      countryId
    };

    return this.httpClient
      .post<{ token: string; user: User }>('https://localhost:7086/users/register/jobseeker', body)
      .pipe(
        map((response) => ({
          status: 'Ok',
          data: response,
        })),
        catchError((response) =>
          of({
            status: response.error.message,
            data: null,
          })
        )
      );
  }

  login(
    email: string,
    password: string
  ): Observable<{ status: string; data: { token: string; user: User } | null }> {
    const body = { email, password };

    return this.httpClient
      .post<{ token: string; user: User }>('https://localhost:7086/users/login', body)
      .pipe(
        map((response) => ({
          status: 'Ok',
          data: response,
        })),
        catchError((response) =>
          of({
            status: response.error.message,
            data: null,
          })
        )
      );
  }
}
