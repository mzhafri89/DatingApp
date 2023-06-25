import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import {
  authenticated,
  login,
  autoLogin,
  setToken,
  register,
} from './auth.actions';
import Auth from '../interfaces/auth.interface';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((action) =>
        this.authService
          .login(action.username, action.password)
          .pipe(map((response) => this.handleAuthResponse(response)))
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap(() => {
        const token = localStorage.getItem('token');

        if (!token) {
          return of({ type: 'NO_ACTION' });
        }

        return of(setToken({ token }));
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      exhaustMap((action) =>
        this.authService
          .register(action.username, action.password)
          .pipe(map((response) => this.handleAuthResponse(response)))
      )
    )
  );

  handleAuthResponse({ token, username }: Auth) {
    localStorage.setItem('token', token);

    this.router.navigate(['main'], { relativeTo: this.route });

    return authenticated({
      username,
      token,
    });
  }
}
