import { createAction, props } from '@ngrx/store';
import Auth from '../interfaces/auth.interface';

export const LOGIN = '[Auth] Login';
export const AUTHENTICATED = '[Auth] Authenticated';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';

export const login = createAction(
  LOGIN,
  props<{
    username: string;
    password: string;
  }>()
);

export const authenticated = createAction(AUTHENTICATED, props<Auth>());

export const logout = createAction(LOGOUT);

export const autoLogin = createAction(AUTO_LOGIN);

export const setToken = createAction(
  '[Auth] Set Token',
  props<Pick<Auth, 'token'>>()
);
