import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Auth from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<Auth>('http://localhost:5000/api/account/login', {
      username,
      password,
    });
  }
}
