import { Action, State } from '../types/index';
import {
  USER_LOGIN,
  USER_LOGIN_FAILS,
  USER_LOGOUT,
} from './actions/actionsTypes';

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case USER_LOGIN: {
      const { token } = payload;
      localStorage.setItem('token', token);
      return { ...state, auth: { token } };
    }
    case USER_LOGIN_FAILS: {
      return { ...state, auth: { token: null, error: payload } };
    }
    case USER_LOGOUT: {
      localStorage.removeItem('token');
      return { ...state, auth: { token: null } };
    }

    default:
      return state;
  }
};
export default reducer;
