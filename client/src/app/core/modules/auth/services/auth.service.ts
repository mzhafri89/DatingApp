import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import Auth from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<Auth>(`${environment.apiUrl}/account/login`, {
      username,
      password,
    });
  }

  register(username: string, password: string) {
    return this.http.post<Auth>(`${environment.apiUrl}/account/register`, {
      username,
      password,
    });
  }
}
