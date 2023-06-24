import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/share/interfaces/user.interface';

@Component({
  selector: 'app-list-landing',
  templateUrl: './list-landing.component.html',
  styleUrls: ['./list-landing.component.css'],
})
export class ListLandingComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (response) => {
        this.users = response as User[];
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
