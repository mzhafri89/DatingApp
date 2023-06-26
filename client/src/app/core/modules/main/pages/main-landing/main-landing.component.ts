import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthState } from '../../../auth/store/auth.reducer';
import { LOGOUT } from '../../../auth/store/auth.actions';
import { User } from 'src/app/share/interfaces/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.component.html',
  styleUrls: ['./main-landing.component.css'],
})
export class MainLandingComponent implements OnInit {
  name$: Observable<string | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {}

  ngOnInit(): void {
    this.router.navigate(['list'], { relativeTo: this.route });

    this.name$ = this.store.select((auth) => auth.auth.user.name);
  }

  logout() {
    this.store.dispatch({ type: LOGOUT });
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
