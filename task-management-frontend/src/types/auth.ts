
export type LoginDto = Pick< IUser, 'email' > & { password: string };


export interface LoginData {
  access_token: string;
  user: IUser;
}

export type LoginResponse = ApiResponse<LoginData>;


export interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
  };
  access_token: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  access_token?: string; 
  user?: IUser;
}