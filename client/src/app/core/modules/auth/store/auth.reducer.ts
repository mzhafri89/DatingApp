import { createReducer, on } from '@ngrx/store';
import { authenticated } from './auth.actions';

const initialState: {
  token: {
    access: null | string;
    refresh: null | string;
  };
  user: {
    id: null | number;
    name: null | string;
  };
} = {
  token: {
    access: null,
    refresh: null,
  },
  user: {
    id: null,
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
      id: action.id,
      name: action.userName,
    },
  }))
);
