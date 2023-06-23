import { createReducer, on } from '@ngrx/store';
import { authenticated, logout } from './auth.actions';

export interface AuthState {
  token: {
    access: null | string;
    refresh: null | string;
  };
  user: {
    name: null | string;
  };
}

const initialState: AuthState = {
  token: {
    access: null,
    refresh: null,
  },
  user: {
    name: null,
  },
};

export default createReducer(
  initialState,
  on(authenticated, (_, action) => ({
    token: {
      access: action.token,
      refresh: null,
    },
    user: {
      name: action.username,
    },
  })),
  on(logout, () => initialState)
);
