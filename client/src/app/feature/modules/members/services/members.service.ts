import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Member from 'src/app/share/interfaces/member.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  // * Get all members
  getMembers() {
    return this.http.get<Member[]>(`${environment.apiUrl}/users`);
  }

  // * Get a member by username
  getMember(username: string) {
    return this.http.get<Member>(`${environment.apiUrl}/users/${username}`);
  }
}
