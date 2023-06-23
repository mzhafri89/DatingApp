import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<User & { token: string }>(
      'http://localhost:5000/api/account/login',
      {
        username,
        password,
      }
    );
  }
}
