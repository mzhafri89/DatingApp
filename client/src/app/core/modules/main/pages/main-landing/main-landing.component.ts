import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthState } from '../../../auth/store/auth.reducer';
import { LOGOUT } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.component.html',
  styleUrls: ['./main-landing.component.css'],
})
export class MainLandingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {}

  ngOnInit(): void {
    this.router.navigate(['list'], { relativeTo: this.route });
  }

  logout() {
    this.store.dispatch({ type: LOGOUT });
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
