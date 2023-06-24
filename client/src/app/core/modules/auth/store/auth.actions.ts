import { createAction, props } from '@ngrx/store';
import Auth from '../interfaces/auth.interface';

export const LOGIN = '[Auth] Login';
export const AUTHENTICATED = '[Auth] Authenticated';
export const LOGOUT = '[Auth] Logout';

export const login = createAction(
  LOGIN,
  props<{
    username: string;
    password: string;
  }>()
);

export const authenticated = createAction(AUTHENTICATED, props<Auth>());

export const logout = createAction(LOGOUT);
