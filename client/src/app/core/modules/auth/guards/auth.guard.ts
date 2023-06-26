import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  canActivate() {
    let isAuthenticated = false;

    this.store
      .select((state) => {
        return state.auth.token.access;
      })
      .subscribe((storeToken) => {
        isAuthenticated = !!storeToken;
      });

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = () =>
  inject(AuthGuardService).canActivate();
