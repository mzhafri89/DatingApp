import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ auth: AuthState }>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token$ = this.store.select((state) => {
      return state.auth.token.access;
    });

    let token: string | null = null;

    token$.subscribe((storeToken) => {
      token = storeToken;
    });

    if (!token) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authRequest);
  }
}
