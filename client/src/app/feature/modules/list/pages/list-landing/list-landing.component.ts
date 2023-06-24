import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/share/interfaces/user.interface';
import { UsersService } from 'src/app/share/services/users.service';

@Component({
  selector: 'app-list-landing',
  templateUrl: './list-landing.component.html',
  styleUrls: ['./list-landing.component.css'],
})
export class ListLandingComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users as User[];
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete'),
    });
  }
}
