import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';

import { authenticated, login, autoLogin, setToken } from './auth.actions';
import { exhaustMap, map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
        this.authService.login(action.username, action.password).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);

            this.router.navigate(['main'], { relativeTo: this.route });

            return authenticated({
              username: response.username,
              token: response.token,
            });
          })
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap((action) => {
        const token = localStorage.getItem('token');

        if (!token) {
          return of({ type: 'NO_ACTION' });
        }

        return of(setToken({ token }));
      })
    )
  );
}
