import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/interfaces/user.interface';

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

export const authenticated = createAction(
  AUTHENTICATED,
  props<User & { token: string }>()
);

export const logout = createAction(LOGOUT);
