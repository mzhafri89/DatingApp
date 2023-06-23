import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthServiceService } from '../services/auth-service.service';

import { authenticated, login } from './auth.actions';
import { exhaustMap, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthServiceService,
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
}
