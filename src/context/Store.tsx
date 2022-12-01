import React, {
  Dispatch,
  createContext,
  FunctionComponent,
  useReducer,
  useMemo,
} from 'react';
import { Action, State } from '../types';
import reducer from './reducer';

const initialState = {
  auth: { token: localStorage.getItem('token') || null },
};

export const Store = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const StoreProvider: FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);
  return <Store.Provider value={contextValue}>{children}</Store.Provider>;
};
