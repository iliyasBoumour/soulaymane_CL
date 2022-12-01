export interface User {
  id: string;
  name: string;
  role: Role[];
}

export interface Material {
  id: string;
  name: string;
  description: string;
  categoriyIds: string[];
}

export interface Category {
  id: string;
  name: string;
}

export enum Role {
  ROLE_MEMBER = 'ROLE_MEMBER',
  ROLE_REPRESENTATIVE = 'ROLE_REPRESENTATIVE',
}

export interface State {
  auth: {
    token: string | null;
    user?: User | null;
    error?: string;
  };
}

export interface Action {
  type: string;
  payload: any | null;
}
