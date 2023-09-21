export interface User {
  id: number;
  name: string;
  mobile_number: string;
}

export interface Authentication {
  access_token: string;
  access_token_expire: number;
  domain: string;
  refresh_token: string;
  refresh_token_expire: number;
}

export interface UserAuthentication {
  user: User | null;
  authentication: Authentication | null;
}

export interface Login {
  mobile_number: number;
  password: string;
}
