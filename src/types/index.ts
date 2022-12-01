export interface User {
  id: string;
  name: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
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
    user: User;
    role: Role;
    error?: string;
  };
}

export interface Action {
  type: string;
  payload: any | null;
}
