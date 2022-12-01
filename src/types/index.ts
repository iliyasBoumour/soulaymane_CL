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

export interface State {
  auth: {
    token: string | null;
    error?: string;
  };
}

export interface Action {
  type: string;
  payload: any | null;
}
