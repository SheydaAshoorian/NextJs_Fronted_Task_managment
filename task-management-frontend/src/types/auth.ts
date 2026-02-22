
export type LoginDto = Pick< IUser, 'email' > & { password: string };


export interface LoginData {
  access_token: string;
  user: IUser;
}

export type LoginResponse = ApiResponse<LoginData>;
